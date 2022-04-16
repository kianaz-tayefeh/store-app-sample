// our-domain/new-customer
// TODO // our-domain/customer/something-importent
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import NewCustomerForm from "../../components/customers/new-customer-form";
import ICustomer from "../../interfaces/iCustomer";
import { useCustomer } from "../../Store/customer-context";
import { usehttpState } from "../../Store/http-state-context";
import ErrorModal from "../../components/ui/ErrorModal";
import LoadingIndicator from "../../components/ui/LoadingIndicator";

const NewCustomerPage = () => {
  const router = useRouter();
  const [, dispatch]: any = useCustomer();
  const [httpState, dispatchHttpState]: any = usehttpState();

  const addCustomerHandler = (customerData: ICustomer) => {
    dispatchHttpState({ Type: "PENDING" });
    fetch("/api/customer/create-customer", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.acknowledged) {
          dispatchHttpState({ Type: "SUCCESS" });
          dispatch({
            Type: "ADD",
            customer: {
              id: result.insertedId.toString(),
              name: customerData.name,
              address: customerData.address,
            },
          });
          router.push("/");
        }
      })
      .catch((er) => {
        dispatchHttpState({
          Type: "ERROR",
          errorMessage: "Something goes wrong in new-customer index.tsx" + er,
        });
      });
  };

  const clearError = React.useCallback(() => {
    dispatchHttpState({ Type: "CLEAR" });
  }, []);

  return (
    <Fragment>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <NewCustomerForm onAddCustomer={addCustomerHandler} />
      {httpState.isLoading && <LoadingIndicator />}
    </Fragment>
  );
};

export default NewCustomerPage;
