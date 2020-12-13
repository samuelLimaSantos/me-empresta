import * as bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

export default hashPassword;
