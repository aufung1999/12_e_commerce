import Head from "next/head";
import Link from "next/link";
import React from "react";

function Layout({ title, children }) {
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
              <Link href="/cart">Cart</Link>
              <Link href="/login">Login</Link>
            </div>
          </nav>
        </header>
        <main className=" border  border-blue-500 container m-auto mt-4 px-4">
          {children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">footer</footer>
      </div>
    </>
  );
}

export default Layout;
