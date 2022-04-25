import { Fragment } from "react";
import MainNavigation from "./main-navigation";
import classes from "./Layout.module.css";
import { LoadingIndicator } from "../ui/LoadingIndicator";

const Layout = (props: any) => {
  return (
    <Fragment>
      <MainNavigation />
      <LoadingIndicator />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
