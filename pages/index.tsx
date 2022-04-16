import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import CustomerList from "../components/customers/customer-list";
import SearchCustomer from "../components/customers/search-customer";
import styles from "../styles/Home.module.css";
import { useCustomer } from "../Store/customer-context";
import { usehttpState } from "../Store/http-state-context";

const Home: NextPage = (props) => {
  console.log("xxxx", props);
  const [, dispatch]: any = useCustomer();
  const [httpState, dispatchHttpState]: any = usehttpState();

  const loadCustomersHandler = React.useCallback((url: string) => {
    dispatchHttpState({ Type: "PENDING" });
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        dispatchHttpState({ Type: "SUCCESS" });
        dispatch({ Type: "GET", customers: result });
      })
      .catch((er) => {
        dispatchHttpState({
          Type: "ERROR",
          errorMessage: "Something goes wrong in search-customer.tsx",
        });
      });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Store App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.main}>
        <SearchCustomer onLoadCustomers={loadCustomersHandler} />
        <CustomerList />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;

// export async function getServerSideProps(context: any) {
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   return { props: { data: 1 } };
// }
