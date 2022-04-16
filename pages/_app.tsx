import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import Layout from "../components/layout/layout";
import { CustomerProvider } from "../Store/customer-context";
import { HttpStateProvider } from "../Store/http-state-context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Layout>
        <HttpStateProvider>
          <CustomerProvider>
            <Component {...pageProps} />
          </CustomerProvider>
        </HttpStateProvider>
      </Layout>
    </Fragment>
  );
}

export default MyApp;
