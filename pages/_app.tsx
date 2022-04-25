import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import Layout from "../components/layout/layout";
import { CustomerProvider } from "../Store/customer-context";
import { HttpStateProvider } from "../Store/http-state-context";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SnackBarProvider from "../Store/snackbar-context";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <HttpStateProvider>
            <SnackBarProvider>
              <CustomerProvider>
                <Component {...pageProps} />
              </CustomerProvider>
            </SnackBarProvider>
          </HttpStateProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </QueryClientProvider>
    </Fragment>
  );
}

export default MyApp;
