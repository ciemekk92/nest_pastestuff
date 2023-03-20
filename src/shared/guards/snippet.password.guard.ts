import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { isDefined } from '../../utils/isDefined';
import { PasswordUtil } from '../../utils/PasswordUtil/PasswordUtil';

@Injectable()
export class SnippetPasswordGuard implements CanActivate {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const snippetId = req.body.id || req.params.id;

    if (!isDefined(snippetId)) {
      throw new BadRequestException('Snippet ID was not provided.');
    }

    const metadata = await this.prismaService.snippetMetadata.findUnique({
      where: { snippetId }
    });

    if (!metadata)
      throw new NotFoundException("Snippet with given id doesn't exist");

    if (!metadata.password) return true;
    if (!req.body.password)
      throw new ForbiddenException('Password was not provided.');

    return PasswordUtil.comparePassword(req.body.password, metadata.password);
  }
}
