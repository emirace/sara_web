import React from "react";
import styled from "styled-components";
import { products } from "../utils/data";
import GallaryProduct from "./GallaryProduct";
import Product from "./Product";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px;
`;
export default function ProductList() {
  return (
    <div style={{ padding: "0 5vw" }}>
      <Container>
        {products.map((product) => (
          <GallaryProduct key={product._id} product={product} />
        ))}
      </Container>
    </div>
  );
}
