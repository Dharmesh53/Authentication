import { timingSafeEqual, createHmac, randomBytes } from "node:crypto";

export const random = () => randomBytes(128).toString("hex");

export const timeSafeEqual = (a: string, b: string) => {
  const BufferA = Buffer.from(a, "hex");
  const BufferB = Buffer.from(b, "hex");
  return timingSafeEqual(BufferA, BufferB);
};

export const hasher = (salt: string, string: string) => {
  return createHmac("sha256", process.env.X_SECERT).update([salt, string].join("/")).digest("hex");
};
