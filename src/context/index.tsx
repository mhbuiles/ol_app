import { AuthProvider } from "./auth";
import { QueryClientProvider } from "./query-client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./theme";

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps): React.ReactElement => (
  <QueryClientProvider>
    <Router>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </Router>
  </QueryClientProvider>
);

export { AppProviders };
