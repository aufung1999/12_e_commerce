import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

import Layout from "@/components/Layout";

import ProductItem from "@/components/ProductItem";

import Product from "@/models/product";
import db from "@/utils/db";
import { useSelector } from "react-redux";

export default function Home({ products }) {
  const CartItems = useSelector((state) => state.CartItems);

  const addToCartHandler = async (product) => {
    const productInCart = CartItems.find((each) => each.slug === product.slug);

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < productInCart?.quantity + 1) {
      alert("sorry out of stock");
      return;
    }
    dispatch({ type: "add-to-Cart", payload: { ...product, quantity: 1 } });

    toast.success("Product added to the cart");
  };

  return (
    <Layout title="Hi">
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
