import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GallaryProduct from "../component/GallaryProduct";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import { products } from "../utils/data";

const Container = styled.div`
  height: 100%;
  padding: 0 5vw;
`;
const Category = styled.div`
  display: flex;
  padding: 50px 0;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
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
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 5px;
  }
`;

export default function CorporatePage() {
  const { state } = useContext(Store);
  const { location } = state;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const getProducts = async () => {
      try {
        if (location) {
          setLoading(true);
          const { data } = await axios.get(
            `/api/products/Corporate/${location}`
          );
          console.log(data);
          setProducts(data.products);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProducts();
  }, []);
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
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : !products.length ? (
          <MessageBox>No Product Found</MessageBox>
        ) : (
          products.map((product) => (
            <>
              <GallaryProduct key={product._id} product={product} />
            </>
          ))
        )}
      </Content>
    </Container>
  );
}
