import { timingSafeEqual, createHmac, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

export const myCookieOptions = {
  domain: "localhost",
  path: "/",
  httpOnly: true,
  sameSite: "lax" as "lax",
  secure: process.env.NODE_ENV === "production",
}

export const random = (length: number) => randomBytes(length).toString("hex");

export const timeSafeEqual = (a: string, b: string) => {
  const BufferA = Buffer.from(a, "hex");
  const BufferB = Buffer.from(b, "hex");
  return timingSafeEqual(BufferA, BufferB);
};

export const hasher = (salt: string, string: string) => {
  return createHmac("sha256", process.env.X_SECERT).update([salt, string].join("/")).digest("hex");
};

const encryptionKey = Buffer.from(process.env.X_SECERT, 'hex');
const iv = randomBytes(16);

export const encryptData = (data: string): string => {
  const cipher = createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(data, 'utf-8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv.toString('base64')}:${encrypted}`;
};

export const decryptData = (encryptedData: string): string => {
  const [ivString, encrypted] = encryptedData.split(':');
  const ivBuffer = Buffer.from(ivString, 'base64');
  const decipher = createDecipheriv('aes-256-cbc', encryptionKey, ivBuffer);
  let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
