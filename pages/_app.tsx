import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Provider as JotaiProvider } from "jotai";
import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import store from "../store";
import "../styles/tailwind.css";
import "../styles/global.css";
import { Router } from "next/router";
import moment from "moment";
import "moment/locale/es";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function WoonMatchSite({ Component, pageProps }: AppProps) {
  //moment.locale("nl");

  moment.updateLocale("en", {
    months: [
      "januari",
      "februari",
      "maart",
      "april",
      "mei",
      "juni",
      "juli",
      "augustus",
      "september",
      "oktober",
      "november",
      "december",
    ],
  });

  return (
    <Provider store={store}>
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </Provider>
  );
}

export default WoonMatchSite;
