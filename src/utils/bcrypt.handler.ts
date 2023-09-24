import {compare, hash} from 'bcryptjs';

async function encrypt(password: string) {
  const passwordHash = await hash(password, 10);
  return passwordHash;
}

async function verify(password: string, passwordHash: string) {
  const isCorrect = await compare(password, passwordHash);
  return isCorrect;
}

export { encrypt, verify };
