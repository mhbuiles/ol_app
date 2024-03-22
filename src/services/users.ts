import type { Error } from "@app/types";
import type { UseQueryResult } from "@tanstack/react-query";
import { useFetch } from "@context/fetch";
import { useQuery } from "@tanstack/react-query";

const USERS_ENDPOINT = "/users";

type Users = Array<{
  id: number;
  name: string;
  lastName: string;
  urlPhoto: string;
  rol: number;
  list: string;
  area: string;
}>;

const useUsers = (): UseQueryResult<Users, Error> => {
  const { authRequest } = useFetch();

  return useQuery<Users, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await authRequest.get<Users>(USERS_ENDPOINT);

      return data;
    },
  });
};

export { useUsers };
export type { Users };
