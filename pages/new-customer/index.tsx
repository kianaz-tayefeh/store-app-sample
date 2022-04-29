// our-domain/new-customer
// TODO // our-domain/customer/something-importent
import React, { Fragment } from "react";
import NewCustomerForm from "../../components/customers/new-customer-form";
import ICustomer from "../../interfaces/iCustomer";
import useHttpPost from "../hooks/useHttpPost";

const NewCustomerPage = () => {
  const httpPost = useHttpPost();

  const addCustomerHandler = (customerData: ICustomer) => {
    const result = httpPost(customerData);
    console.log(result);
  };

  return (
    <Fragment>
      <NewCustomerForm onAddCustomer={addCustomerHandler} />
    </Fragment>
  );
};

export default NewCustomerPage;
