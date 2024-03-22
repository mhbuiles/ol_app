import { FetchProvider } from "@context/fetch";
import { FullPageSpinner } from "@components/full-page-spinner";
import { RoutePaths } from "@utils/constants";
import { TopBar } from "@components/top-bar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import {
  loadDashboard,
  loadNotifications,
  loadProjects,
  loadUsers,
} from "@utils/code-splitting";

const Dashboard = lazy(loadDashboard);
const Notifications = lazy(loadNotifications);
const Projects = lazy(loadProjects);
const Users = lazy(loadUsers);

const AuthenticatedApp = (): React.ReactElement => (
  <FetchProvider>
    <TopBar />
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route>
          <Route path={RoutePaths.dashboard} element={<Dashboard />} />
          <Route path={RoutePaths.projects} element={<Projects />} />
          <Route path={RoutePaths.users} element={<Users />} />
          <Route path={RoutePaths.notifications} element={<Notifications />} />
          <Route path="*" element={<Navigate to={RoutePaths.dashboard} />} />
        </Route>
      </Routes>
    </Suspense>
  </FetchProvider>
);

export default AuthenticatedApp;
