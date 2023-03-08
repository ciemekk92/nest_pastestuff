import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (
  plainTextPassword: string
): Promise<string> => {
  return await bcrypt.hash(plainTextPassword, saltRounds);
};
