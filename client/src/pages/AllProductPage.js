import React from "react";
import styled from "styled-components";
import ProductList from "../component/ProductList";

const Container = styled.div`
  padding: 5vw 0;
`;
export default function AllProductPage() {
  return (
    <Container>
      <ProductList />
    </Container>
  );
}
