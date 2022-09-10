import React from "react";
import Navbar from "./component/Navbar";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import GalleryScreen from "./pages/GalleryScreen";
import "./App.css";
import ProductScreen from "./pages/ProductScreen";

const Container = styled.div`
  background: black;
  color: white;
  height: 100%;
`;
export default function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="gallery" element={<GalleryScreen />} />
        <Route path="product/:slug" element={<ProductScreen />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </Container>
  );
}
