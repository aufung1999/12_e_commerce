import { combineReducers } from "redux";
import Cookies from "js-cookie";

//######################################################################################################

const CartItemsReducer = (
  state = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
  action
) => {
  switch (action.type) {
    case "add-to-Cart": {
      const newItem = action.payload;
      const existItem = state.find((item) => item.slug === newItem.slug);
      const cartItems = existItem
        ? state.map((item) =>
            item.name === existItem.name
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...state, newItem];
      Cookies.set("cart", JSON.stringify(cartItems));
      return cartItems;
    }
    case "delete-from-Cart": {
      const deleteItem = action.payload;
      const removedItems = state.filter(
        (item) => item.slug !== deleteItem.slug
      );
      Cookies.set("cart", JSON.stringify(removedItems));
      return removedItems;
    }
    case "update-Quantity": {
      const updateItem = action.payload;
      const existItem = state.find((item) => item.slug === updateItem.slug);
      const cartItems = existItem
        ? state.map((item) =>
            item.name === existItem.name
              ? { ...item, quantity: updateItem.quantity }
              : item
          )
        : [...state, newItem];
      Cookies.set("cart", JSON.stringify(cartItems));
      return cartItems;
    }

    default:
      return state;
  }
};

//############################################################################################################################################################
const reducers = combineReducers({
  CartItems: CartItemsReducer,
});

export default reducers;
