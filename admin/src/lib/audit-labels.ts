/** Human wording for audit actions, shown in the activity log and dashboard. */
const LABELS: Record<string, string> = {
  "auth.login": "Signed in",
  "auth.login_failed": "Failed sign-in attempt",
  "auth.login_blocked": "Sign-in blocked (too many attempts)",
  "auth.logout": "Signed out",
  "auth.password_changed": "Changed password",
  "invite.created": "Sent an invitation",
  "invite.revoked": "Revoked an invitation",
  "invite.accepted": "Accepted an invitation",
  "user.role_changed": "Changed a user's role",
  "user.disabled": "Disabled a user",
  "user.enabled": "Re-enabled a user",
  "user.created_cli": "Created by setup script",
};

export const describeAction = (action: string) => LABELS[action] ?? action;
