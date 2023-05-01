import "@/styles/globals.css";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/redux/reducers/reducers";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const store = configureStore({ reducer: reducers });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
