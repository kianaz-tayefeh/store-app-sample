import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import { useCustomer } from "../../Store/customer-context";
import { usehttpState } from "../../Store/http-state-context";
import ErrorModal from "../ui/ErrorModal";
import LoadingIndicator from "../ui/LoadingIndicator";
import classes from "./search-customer.module.css";

const SearchCustomer = (props: any) => {
  console.log("LOADING SEARCHFORM ...");

  const [searchInput, setSearchInput] = React.useState<string>("");
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [httpState, dispatchHttpState]: any = usehttpState();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === searchRef.current?.value) {
        let url =
          searchInput.length === 0
            ? "/api/customer/read-customer"
            : "/api/customer/" + searchInput;
        props.onLoadCustomers(url);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, searchRef]);

  const clearError = React.useCallback(() => {
    dispatchHttpState({ Type: "CLEAR" });
  }, []);

  return (
    <Fragment>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <section className={classes.Search}>
        <TextField
          id="search"
          label="Search by Name"
          type="search"
          variant="standard"
          inputRef={searchRef}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <br />
      </section>
      {httpState.isLoading && <LoadingIndicator />}
    </Fragment>
  );
};

export default SearchCustomer;
