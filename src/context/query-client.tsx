import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useConstant } from "@utils/hooks";
import {
  QueryClient,
  QueryClientProvider as RQProvider,
} from "@tanstack/react-query";

type QueryClientProviderProps = {
  children: React.ReactNode;
};

const QueryClientProvider = ({
  children,
}: QueryClientProviderProps): React.ReactElement => {
  const queryClient = useConstant(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <RQProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="top" />
    </RQProvider>
  );
};

export { QueryClientProvider };
