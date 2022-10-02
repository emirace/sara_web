import React from "react";
import styled from "styled-components";
import GallaryProduct from "../component/GallaryProduct";
import { color } from "../constant/parameters";
import { products } from "../utils/data";

const Container = styled.div`
  height: 100%;
  padding: 0 5vw;
`;
const Category = styled.div`
  display: flex;
  padding: 50px 0;
`;
const Item = styled.div`
  border: 1px solid;
  padding: 10px 8px;
  width: 100px;
  text-align: center;
  font-weight: 600;
  margin: 0 5px;
  font-size: 13px;
  cursor: pointer;
  &.active {
    background: ${color.main};
    border: 0;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px;
  padding-bottom: 50px;
  border-bottom: 1px solid;
`;

const images = [
  { key: 1, src: "cat1.webp" },
  { key: 2, src: "cat2.jpg" },
  { key: 3, src: "cat3.jpg" },
  { key: 4, src: "cat4.jpg" },
  { key: 5, src: "cat5.jpg" },
  { key: 6, src: "cat6.jpg" },
  { key: 7, src: "cat7.jfif" },
  { key: 8, src: "cat8.jfif" },
  { key: 9, src: "cat9.webp" },
  { key: 10, src: "cat10.png" },
  { key: 11, src: "cat11.jpg" },
  { key: 12, src: "cat12.webp" },
];
export default function CorporatePage() {
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>CORPORATE</h1>
      <Category>
        <Item className="active">ALL</Item>
        <Item>WOMEN</Item>
        <Item>MEN</Item>
        <Item>BOYS</Item>
        <Item>GIRLS</Item>
        <Item>ACCESORIES</Item>
      </Category>
      <Content>
        {console.log(products)}
        {products.map((product) => (
          <>
            {console.log(product)}
            <GallaryProduct key={product._id} product={product} />
          </>
        ))}
      </Content>
    </Container>
  );
}
