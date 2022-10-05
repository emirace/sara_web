import React, { useContext } from "react";
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
import { AdminRoute } from "./utils/protected";

const Container = styled.div`
  background: ${(prop) => (prop.mode === "darkmode" ? "black" : "#d4d4d4")};
  color: ${(prop) => (prop.mode === "darkmode" ? "white" : "black")};
  height: 100%;
`;
const Body = styled.body``;
export default function App() {
  const { state } = useContext(Store);
  const { mode } = state;
  return (
    <Container mode={mode}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="gallery" element={<GalleryScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="casual" element={<CasualPage />} />
        <Route path="corporate" element={<CorporatePage />} />
        <Route path="owambe" element={<OwambePage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="bookorder" element={<BookOrderScreen />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="delivery" element={<DeliveryPage />} />
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
      <Footer />
    </Container>
  );
}
