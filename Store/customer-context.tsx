import React from "react";
import ICustomer from "../interfaces/iCustomer";

const CustomerContext = React.createContext([]);
export default CustomerContext;

function customerReducer(currentCustomers: any, action: any) {
  switch (action.Type) {
    case "ADD":
      return [...currentCustomers, action.customer];
    case "GET":
      return action.customers;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const CustomerProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(customerReducer, []);
  return <CustomerContext.Provider value={[state, dispatch]} {...props} />;
};

export const useCustomer = () => {
  const context = React.useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerContext");
  }
  return context;
};
