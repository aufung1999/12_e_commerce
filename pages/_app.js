import "@/styles/globals.css";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/redux/reducers/reducers";
import { Provider } from "react-redux";

const store = configureStore({ reducer: reducers });

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
