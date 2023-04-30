import { combineReducers } from "redux";

//######################################################################################################

const CartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case "add-to-Cart":
      const newItem = action.payload;
      const existItem = state.find((item) => item.slug === newItem.slug);
      const cartItems = existItem
        ? state.map((item) =>
            item.name === existItem.name
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...state, newItem];
      // Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return cartItems;
    default:
      return state;
  }
};

//############################################################################################################################################################
const reducers = combineReducers({
  CartItems: CartItemsReducer,
});

export default reducers;
