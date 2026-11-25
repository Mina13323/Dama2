import type { Role } from "@prisma/client";

export const ROLES: Role[] = ["ADMIN", "EDITOR", "VIEWER"];

export const roleLabel: Record<Role, string> = {
  ADMIN: "Admin",
  EDITOR: "Editor",
  VIEWER: "Viewer",
};

export const roleDescription: Record<Role, string> = {
  ADMIN: "Manages users and settings, and puts changes live.",
  EDITOR: "Creates and edits projects, news and careers, and publishes to the preview.",
  VIEWER: "Can look at everything, but cannot change anything.",
};

/** What each role may do. Server actions check these; the UI only hides what a role cannot use. */
export const can = {
  manageUsers: (r: Role) => r === "ADMIN",
  viewAudit: (r: Role) => r === "ADMIN",
  editContent: (r: Role) => r === "ADMIN" || r === "EDITOR",
  goLive: (r: Role) => r === "ADMIN",
};
