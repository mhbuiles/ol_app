import type { Error } from "@app/types";
import type { UseQueryResult } from "@tanstack/react-query";
import { useFetch } from "@context/fetch";
import { useQuery } from "@tanstack/react-query";

const NOTIFICATIONS_ENDPOINT = "/notification";

type Notifications = Array<{
  id: number;
  type: string;
  details: string;
  time: string;
}>;

const useNotifications = (): UseQueryResult<Notifications, Error> => {
  const { authRequest } = useFetch();

  return useQuery<Notifications, Error>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await authRequest.get<Notifications>(
        NOTIFICATIONS_ENDPOINT,
      );

      return data;
    },
  });
};

export { useNotifications };
export type { Notifications };
