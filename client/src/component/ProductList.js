import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GallaryProduct from "./GallaryProduct";
import LoadingBox from "./LoadingBox";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px;
`;
export default function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products/");
        console.log(data);
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <div>{error}</div>
  ) : !products.length ? (
    <div>No Product Found</div>
  ) : (
    <div style={{ padding: "0 5vw" }}>
      <Container>
        {products.map((product) => (
          <GallaryProduct key={product._id} product={product} />
        ))}
      </Container>
    </div>
  );
}
