import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/" />;
}

export function CartRoute({ children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  return cart.length ? children : <Navigate to="/cart" />;
}
