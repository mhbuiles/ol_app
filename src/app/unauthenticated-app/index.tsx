import { FullPageSpinner } from "@components/full-page-spinner";
import { RoutePaths } from "@utils/constants";
import { loadLogin } from "@utils/code-splitting";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Login = lazy(loadLogin);

const UnauthenticatedApp = (): React.ReactElement => (
  <Suspense fallback={<FullPageSpinner />}>
    <Routes>
      <Route>
        <Route path={RoutePaths.login} element={<Login />} />
        <Route path="*" element={<Navigate to={RoutePaths.login} />} />
      </Route>
    </Routes>
  </Suspense>
);

export default UnauthenticatedApp;
