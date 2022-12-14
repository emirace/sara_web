import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GallaryProduct from "../component/GallaryProduct";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import { products } from "../utils/data";
import Filter from "./Filter";

const Container = styled.div`
  height: 100%;
  padding: 0 5vw;
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
export default function OwambePage() {
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
            `/api/products/Owambe/${location}?query=${selected}`
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
      <h1 style={{ textAlign: "center" }}>OWAMBE</h1>
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
            <>
              <GallaryProduct key={product._id} product={product} />
            </>
          ))
        )}
      </Content>
    </Container>
  );
}
