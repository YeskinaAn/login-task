import { QueryClient } from "@tanstack/react-query";
import { privateLoginApi } from "./loginApi";

const defaultQueryFunction = ({
  queryKey: [url, data],
}) => {
  return privateLoginApi.get(url, { params: data }).then(({ data }) => data);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
      refetchOnWindowFocus: false,
    },
  },
});



