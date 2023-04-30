import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductItems({ product }) {
  const dispatch = useDispatch();
  const productInCart = useSelector((state) =>
    state?.CartItems?.find((each) => each.slug === product.slug)
  );
  // const productInCart = useSelector((state) =>
  //   state?.CartItems
  // );

  console.log('productInCart: ' + productInCart)

  const addToCart = () => {
    if (product.countInStock < productInCart?.quantity + 1) {
      alert("sorry out of stock");
      return;
    }
    dispatch({ type: "add-to-Cart", payload: { ...product, quantity: 1 } });
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className=" rounded shadow"
        />
      </Link>

      <div className=" flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-2">${product.price}</p>
        <button onClick={addToCart} className=" primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItems;
