import { randomBytes } from 'crypto';

export const createHashFromString = (length = 16): string => {
  return randomBytes(length).toString('base64url');
};
