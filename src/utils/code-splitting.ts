const loadAuthenticatedApp = (): Promise<{ default: React.FC }> =>
  import("@app/authenticated-app");

const loadUnauthenticatedApp = (): Promise<{ default: React.FC }> =>
  import("@app/unauthenticated-app");

const loadDashboard = (): Promise<{ default: React.FC }> =>
  import("@views/dashboard");

const loadUsers = (): Promise<{ default: React.FC }> => import("@views/users");

const loadLogin = (): Promise<{ default: React.FC }> => import("@views/login");

const loadProjects = (): Promise<{ default: React.FC }> =>
  import("@views/projects");

const loadNotifications = (): Promise<{ default: React.FC }> =>
  import("@views/notifications");

export {
  loadAuthenticatedApp,
  loadDashboard,
  loadLogin,
  loadNotifications,
  loadProjects,
  loadUnauthenticatedApp,
  loadUsers,
};
