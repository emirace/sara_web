import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: [],
  mode: "darkmode",
  style: null,
  bookOrder: null,
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

    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };

    case "ADD_STYLE":
      return { ...state, style: action.payload };
    case "BOOK_ORDER":
      return { ...state, bookOrder: action.payload };

    case "REMOVE_STYLE":
      return { ...state, style: null };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: [],
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
