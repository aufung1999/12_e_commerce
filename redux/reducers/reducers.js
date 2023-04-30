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
    case "delete-from-Cart":
      const deleteItem = action.payload;
      const removedItems = state.filter(
        (item) => item.slug !== deleteItem.slug
      );
      return removedItems;
    case "update-Quantity":
      const updateItem = action.payload;
      const existItem_ = state.find((item) => item.slug === updateItem.slug);
      const updatedItem = existItem_
        ? state.map((item) =>
            item.name === existItem_.name
              ? { ...item, quantity: updateItem.quantity }
              : item
          )
        : [...state, newItem];
      return updatedItem;

    default:
      return state;
  }
};

//############################################################################################################################################################
const reducers = combineReducers({
  CartItems: CartItemsReducer,
});

export default reducers;
