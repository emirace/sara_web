import React, { useContext, useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import GalleryScreen from "./pages/GalleryScreen";
import "./App.css";
import ProductScreen from "./pages/ProductScreen";
import Catalogue from "./pages/Catalogue";
import { Store } from "./Store";
import Footer from "./component/Footer";
import CasualPage from "./pages/CasualPage";
import CorporatePage from "./pages/CorporatePage";
import OwambePage from "./pages/OwambePage";
import AccessoriesPage from "./pages/AccessoriesPage";
import BookOrderScreen from "./pages/BookOrderScreen";
import CartPage from "./pages/CartPage";
import DeliveryPage from "./pages/DeliveryPage";
import DashboardPage from "./pages/DashboardPage";
import BookDeliveryPage from "./pages/BookDeliveryPage";
import AddProductPage from "./pages/AddProductPage";
import AddImagePage from "./pages/AddImagePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import { AdminRoute, CartRoute } from "./utils/protected";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import BookOrderDetailPage from "./pages/BookOrderDetailPage";
import AllProductPage from "./pages/AllProductPage";
import axios from "axios";
import AboutPage from "./pages/AboutPage";
import CatalogueScreen from "./pages/CaralogueScreen";
import EditProductPage from "./pages/EditProductPage";
import ScrollToTop from "./component/ScrollToTop";

const Container = styled.div`
  background: ${(prop) => (prop.mode === "darkmode" ? "black" : "#d4d4d4")};
  color: ${(prop) => (prop.mode === "darkmode" ? "white" : "black")};
  height: 100%;
`;
const Body = styled.body``;
export default function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { mode } = state;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getLocation = async () => {
      const { data } = await axios.get("/api/locations");
      console.log(data);
      ctxDispatch({ type: "ADD_LOCATION", payload: data });
      setLoading(false);
    };
    getLocation();
  }, []);
  return (
    <Container mode={mode}>
      <Navbar />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="gallery" element={<GalleryScreen />} />
          <Route path="product/:slug" element={<ProductScreen />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="casual" element={<CasualPage />} />
          <Route path="corporate" element={<CorporatePage />} />
          <Route path="owambe" element={<OwambePage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="bookorder" element={<BookOrderScreen />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="ordercreated/:type/:id" element={<OrderSuccessPage />} />
          <Route path="order/:id" element={<OrderDetailPage />} />
          <Route path="bookorder/:id" element={<BookOrderDetailPage />} />
          <Route path="catalogue/:id" element={<CatalogueScreen />} />
          <Route path="allproduct" element={<AllProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="delivery"
            element={
              <CartRoute>
                <DeliveryPage />
              </CartRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />
          <Route path="bookdelivery" element={<BookDeliveryPage />} />
          <Route
            path="addproduct"
            element={
              <AdminRoute>
                <AddProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="editproduct/:slug"
            element={
              <AdminRoute>
                <EditProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="add/:type"
            element={
              <AdminRoute>
                <AddImagePage />
              </AdminRoute>
            }
          />
          <Route path="search" element={<SearchPage />} />
          <Route path="loginadmin" element={<LoginPage />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>
      </ScrollToTop>
      <Footer />
    </Container>
  );
}
