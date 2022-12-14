import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GallaryProduct from "../component/GallaryProduct";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import Filter from "./Filter";

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

export default function CasualPage() {
  const { state } = useContext(Store);
  const { location } = state;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("ALL");

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (location) {
          setLoading(true);
          const { data } = await axios.get(
            `/api/products/Casual/${location}?query=${selected}`
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
  }, [selected]);
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>CASUAL</h1>
      <Filter setSelected={setSelected} selected={selected} />

      <Content>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : !products.length ? (
          <MessageBox>No Product Found</MessageBox>
        ) : (
          products.map((product) => (
            <GallaryProduct key={product.key} product={product} />
          ))
        )}
      </Content>
    </Container>
  );
}
