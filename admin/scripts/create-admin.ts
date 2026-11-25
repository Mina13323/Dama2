/**
 * Creates (or resets) a DAMA CMS admin account from the command line.
 * Needed once, to create the first admin; everyone else is invited from the CMS.
 *
 *   npm run create-admin -- --email you@damadevelopments.com --name "Your Name"
 *
 * The password is typed at a hidden prompt (or read from ADMIN_PASSWORD for automation).
 */
import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const args = Object.fromEntries(
  process.argv.slice(2).reduce<[string, string][]>((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1] ?? ""]] : acc), []),
);

function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(question);
    if (!stdin.isTTY) {
      let data = "";
      stdin.on("data", (c) => (data += c));
      stdin.on("end", () => resolve(data.trim()));
      return;
    }
    let value = "";
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (ch: string) => {
      if (ch === "\r" || ch === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.off("data", onData);
        process.stdout.write("\n");
        resolve(value);
      } else if (ch === "\u0003") {
        process.exit(1);
      } else if (ch === "\u007f" || ch === "\b") {
        value = value.slice(0, -1);
      } else {
        value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

async function main() {
  const email = String(args.email || "").trim().toLowerCase();
  const name = String(args.name || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || name.length < 2) {
    console.error('Usage: npm run create-admin -- --email you@example.com --name "Your Name"');
    process.exit(1);
  }
  const password = process.env.ADMIN_PASSWORD || (await askHidden("Password (at least 10 characters): "));
  if (password.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    const passwordHash = await hash(password);
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, passwordHash, role: "ADMIN", active: true },
      create: { email, name, passwordHash, role: "ADMIN" },
    });
    await prisma.session.deleteMany({ where: { userId: user.id } });
    await prisma.auditLog.create({ data: { action: "user.created_cli", userId: user.id, entity: "user", entityId: user.id, meta: { email }, ip: "cli" } });
    console.log(`Admin ready: ${name} <${email}>`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
