import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMutation, UseMutateFunction } from "react-query";
import ICustomer from "../../interfaces/iCustomer";
import { useSnackbar } from "../../Store/snackbar-context";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../react-query/constants";

export const useHttpPost = (): UseMutateFunction<any, any, ICustomer, any> => {
  const { showMessage } = useSnackbar();
  const postCustomer = useCallback((customerData: ICustomer) => {
    try {
      const result = axiosInstance
        .post("/create-customer", customerData)
        .then((response) => {
          if (response) {
            return response.data;
          }
        })
        .catch((e) => {
          throw new Error("Netowork Failed");
        });
      return result;
    } catch (error) {
      throw new Error("Netowork Failed");
    }
  }, []);
  const router = useRouter();

  const { mutate, data } = useMutation(
    [queryKeys.customers],
    (customerData: ICustomer) => postCustomer(customerData),
    {
      onMutate: () => {},
      onSuccess: () => {
        showMessage({
          message: "Successfully Add To Server",
          messageType: "success",
          open: true,
        });
        router.push("/");
      },
    }
  );
  console.log(data);

  return mutate;
};
export default useHttpPost;

// dispatchHttpState({ Type: "PENDING" });
// fetch("/api/customer/create-customer", {
//   method: "POST",
//   body: JSON.stringify(customerData),
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => {
//     if (result.acknowledged) {
//       dispatchHttpState({ Type: "SUCCESS" });
//       dispatch({
//         Type: "ADD",
//         customer: {
//           id: result.insertedId.toString(),
//           name: customerData.name,
//           address: customerData.address,
//         },
//       });
//       router.push("/");
//     }
//   })
//   .catch((er) => {
//     dispatchHttpState({
//       Type: "ERROR",
//       errorMessage: "Something goes wrong in new-customer index.tsx" + er,
//     });
//   });
