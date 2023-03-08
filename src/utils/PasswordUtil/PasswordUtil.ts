import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  private static saltRounds = 10;

  public static async hashPassword(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, PasswordUtil.saltRounds);
  }

  public static async comparePassword(
    plainTextPassword: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash);
  }
}
