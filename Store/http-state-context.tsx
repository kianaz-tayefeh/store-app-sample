import React from "react";

const initialValueHttpState = { isLoading: false, error: null };
const HttpStateContext = React.createContext({ isLoading: false, error: null });
export default HttpStateContext;

const httpStateReducer = (curHttpState: any, action: any) => {
  switch (action.Type) {
    case "PENDING":
      return { isLoading: true, error: null };
    case "SUCCESS":
      return { ...curHttpState, isLoading: false };
    case "ERROR":
      return { isLoading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not get there!");
  }
};

export const HttpStateProvider = (props: any) => {
  const [httpState, dispatchHttpState] = React.useReducer(
    httpStateReducer,
    initialValueHttpState
  );
  return (
    <HttpStateContext.Provider
      value={[httpState, dispatchHttpState]}
      {...props}
    />
  );

  //   return (
  // <HttpStateContext.Provider value={[httpState, dispatchHttpState]}>
  //   {props.children}
  // </HttpStateContext.Provider>
  //   );
};

export const usehttpState = () => {
  const context = React.useContext(HttpStateContext);
  if (!context) {
    throw new Error("usehttpState must be used within a HttpStateContext");
  }
  return context;
};
