import { createHash, randomBytes } from "node:crypto";
import { hash, verify } from "@node-rs/argon2";

/** 256-bit random token, URL-safe. Used for sessions and invite links. */
export const randomToken = () => randomBytes(32).toString("base64url");

/** Tokens are stored only as SHA-256 hashes, so a database leak does not leak live sessions. */
export const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export const PASSWORD_MIN = 10;
export const PASSWORD_MAX = 200;

/** Argon2id with the library's recommended defaults. */
export const hashPassword = (password: string) => hash(password);

export async function verifyPassword(passwordHash: string, password: string) {
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}

/** A real Argon2 hash to verify against when the email is unknown, so timing does not reveal accounts. */
let dummyHash: Promise<string> | undefined;
export const timingSafeDummyHash = () => (dummyHash ??= hash("not-a-real-password-just-for-timing"));
