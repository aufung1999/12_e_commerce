import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Layout({ title, children }) {
  const CartItems = useSelector((state) => state.CartItems);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(CartItems.reduce((a, c) => a + c.quantity, 0));
  }, [CartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + " - Amazonaa" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex min-h-screen flex-col justify-between">
        <header className=" border border-red-500">
          <nav className=" flex h-12 justify-between items-center px-4 shadow-md">
            <Link href="/" className=" text-xl font-bold">
              Amazona
            </Link>
            <div className=" border border-red-500 w-28 flex justify-evenly">
              <Link href="/cart">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/login">Login</Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
