import "@/styles/globals.css";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/redux/reducers/reducers";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const store = configureStore({ reducer: reducers });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </Provider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}
