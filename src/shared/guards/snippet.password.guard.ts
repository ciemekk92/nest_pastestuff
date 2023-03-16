import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordUtil } from '../../utils/PasswordUtil/PasswordUtil';

@Injectable()
export class SnippetPasswordGuard implements CanActivate {
  constructor(@Inject('PrismaClient') private prismaClient: PrismaClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const metadata = await this.prismaClient.snippetMetadata.findUnique({
      where: { snippetId: req.body.id }
    });

    if (!metadata)
      throw new NotFoundException("Snippet with given id doesn't exist");

    if (!metadata.password) return true;

    return PasswordUtil.comparePassword(req.body.password, metadata.password);
  }
}
