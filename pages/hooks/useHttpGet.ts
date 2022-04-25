import { useCallback } from "react";
import { useQuery } from "react-query";
import ICustomer from "../../interfaces/iCustomer";
import { useSnackbar } from "../../Store/snackbar-context";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../react-query/constants";

interface useHttpGet {
  customerData: ICustomer[];
}

export const useHttpGet = (url: string): useHttpGet => {
  const fallback: any = [];
  const { showMessage } = useSnackbar();

  const getCustomers = useCallback((url: string) => {
    try {
      const result = axiosInstance
        .get(url)
        .then((response) => {
          if (response) return response.data;
        })
        .catch((e) => {
          throw new Error("Netowork Failed");
        });
      return result;
    } catch (error) {
      throw new Error("Netowork Failed");
    }
  }, []);

  const { data: customerData = fallback } = useQuery(
    [queryKeys.customers, url],
    () => getCustomers(url),
    {
      onError: (error) => {
        const errorMessage =
          error instanceof Error
            ? error.message.toString().replace(/^Error:\s*/, "")
            : "error connecting server";
        showMessage({
          message: errorMessage,
          messageType: "error",
          open: true,
        });
        return fallback;
      },
    }
  );
  return { customerData };
};
export default useHttpGet;

// const fetchData = () => {
//   dispatchHttpState({ Type: "PENDING" });
//   axiosInstance
//     .get("/read-customer")
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .then((result) => {
//       dispatchHttpState({ Type: "SUCCESS" });
//       dispatch({ Type: "GET", customers: result });
//     })
//     .catch((er) => {
//       dispatchHttpState({
//         Type: "ERROR",
//         errorMessage: "Something goes wrong in search-customer.tsx",
//       });
//     });
// };
