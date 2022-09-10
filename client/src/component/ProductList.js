import React from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 0 5vw;
  display: flex;
  flex-wrap: wrap;
`;
export default function ProductList() {
  return (
    <Container>
      <Product image="/images/p1.jpg" name="Name" />
      <Product image="/images/p2.jpg" name="Name" />
      <Product image="/images/p3.jpg" name="Name" />
      <Product image="/images/p7.jpg" name="Name" />
      <Product image="/images/p5.jpg" name="Name" />
      <Product image="/images/p3.jpg" name="Name" />
      <Product image="/images/p2.jpg" name="Name" />
      <Product image="/images/p1.jpg" name="Name" />
      <Product image="/images/p3.jpg" name="Name" />
      <Product image="/images/p7.jpg" name="Name" />
      <Product image="/images/p5.jpg" name="Name" />
      <Product image="/images/p1.jpg" name="Name" />
    </Container>
  );
}
