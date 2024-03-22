import { FullPageSpinner } from "@components/full-page-spinner";
import { useAuth } from "@context/auth";
import { Fragment, Suspense, lazy } from "react";
import {
  loadAuthenticatedApp,
  loadUnauthenticatedApp,
} from "@utils/code-splitting";

const UnauthenticatedApp = lazy(loadUnauthenticatedApp);
const AuthenticatedApp = lazy(loadAuthenticatedApp);

const App = (): React.ReactElement => {
  const { user } = useAuth();

  return (
    <Fragment>
      <Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </Suspense>
    </Fragment>
  );
};

export { App };
