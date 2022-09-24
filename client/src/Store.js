import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  cart: [],
  mode: "darkmode",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart, newItem];

      return { ...state, cart: cartItems };
    case "REMOVE_CART_ITEM": {
      const cartItems = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: cartItems };
    }

    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
