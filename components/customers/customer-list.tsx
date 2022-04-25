import React, { Fragment } from "react";
import ICustomer from "../../interfaces/iCustomer";
import CustomerItem from "./customer-item";
import classes from "./customer-list.module.css";

const CustomerList = (props: any) => {
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.data.map((customer: ICustomer) => (
          <CustomerItem key={customer._id} customer={customer} />
        ))}
      </ul>
    </Fragment>
  );
};

export default CustomerList;
