import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";

function CartScreen() {
  const router = useRouter();

  const dispatch = useDispatch();
  const CartItems = useSelector((state) => state.CartItems);

  console.log(CartItems);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItemsCount_Price, setCartItemsCount_Price] = useState(0);

  useEffect(() => {
    setCartItemsCount(CartItems.reduce((a, c) => a + c.quantity, 0));
    setCartItemsCount_Price(
      CartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
  }, [CartItems]);

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);

    console.log(item)

    const { data } = await axios.get(`/api/products/${item._id}`);

    console.log(data)

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({
      type: "update-Quantity",
      payload: { ...item, quantity: quantity },
    });
    toast.success("Product updated in the cart");
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "delete-from-Cart", payload: item });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className=" mb-4 text-xl">Shopping Cart</h1>
      {CartItems.length === 0 ? (
        <div>
          Cart is empty <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className=" grid md:grid-cols-4 md:gap-5">
          <div className=" overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {CartItems?.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal {cartItemsCount} {cartItemsCount_Price}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen, { ssr: false }));
