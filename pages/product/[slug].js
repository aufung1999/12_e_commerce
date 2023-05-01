import Layout from "@/components/Layout";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { toast } from "react-toastify";
import Product from "@/models/product";
import db from "@/utils/db";

export default function ProductScreen(props) {
  const { product } = props;

  const dispatch = useDispatch();

  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }
  const productInCart = useSelector((state) =>
    state.CartItems.find((each) => each.slug === product.slug)
  );

  const addToCart = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < productInCart?.quantity + 1) {
      alert("sorry out of stock");
      return;
    }
    dispatch({ type: "add-to-Cart", payload: { ...product, quantity: 1 } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to Home Page</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category} </li>
            <li>Brand: {product.brand} </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description} </li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
