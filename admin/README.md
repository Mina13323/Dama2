# DAMA CMS (admin)

Private staff app for managing projects, news and careers on the DAMA website.
Plan and phases: [`../docs/CMS-PLAN.md`](../docs/CMS-PLAN.md).

**Phase 1 (this version): access** — sign-in, roles, invitations, sessions, activity log.

| Role | Can |
|---|---|
| Admin | everything, including users & access and the activity log |
| Editor | create and edit content, publish to the preview *(content arrives in phase 2)* |
| Viewer | read only |

## Run locally

Requires Node 20+ and MySQL 8.

```bash
cd admin
npm install
cp .env.example .env          # set DATABASE_URL and APP_URL
npm run db:migrate            # creates the tables
npm run create-admin -- --email you@damadevelopments.com --name "Your Name"
npm run dev                   # http://localhost:3100
```

Everyone else is invited from **Users & access**: the admin creates an invitation and
sends the one-time link (valid 7 days). The invitee sets their name and password.

## Security

- Passwords hashed with Argon2id; minimum 10 characters.
- Sessions: random 256-bit token in an HttpOnly, SameSite=Lax cookie (Secure in production);
  only its SHA-256 hash is stored. Signed out after 7 days idle and 30 days in any case.
- Sign-in is rate-limited (5 failures per account / 20 per IP in 15 minutes) and does not
  reveal whether an email exists.
- Disabling a user signs them out everywhere at once. Changing a password signs out other devices.
- At least one active admin always remains; admins cannot demote or disable themselves.
- Every sign-in and access change is written to the activity log (who, what, when, IP).
- Every page and server action checks the session and role on the server; the middleware
  is only a first redirect.
- `noindex` headers, frame blocking and no `X-Powered-By`.

## Deploy (Hostinger)

Needs a plan with **Node.js apps** (Business / Cloud) or a **VPS**, plus a MySQL database.

```bash
npm ci
npx prisma migrate deploy
npm run build
npm start                     # port 3100, behind the host's HTTPS proxy
```

Set `DATABASE_URL` and `APP_URL=https://admin.<your-domain>` in the host's environment.
Serve it over HTTPS only.
