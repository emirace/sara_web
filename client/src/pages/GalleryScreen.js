import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingBox from "../component/LoadingBox";
import Product from "../component/Product";
import { color } from "../constant/parameters";

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
  &:hover {
    background: ${color.main};
    border: 0;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  padding-bottom: 50px;
  border-bottom: 1px solid;
`;

export default function GalleryScreen() {
  const [loading, setLoading] = useState(true);
  const [galleries, setGalleries] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const getGalleries = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/galleries/");
        console.log(data);
        setGalleries(data.galleries);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getGalleries();
  }, []);
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>GALLARY</h1>
      <Category>
        <Item className="active">ALL</Item>
        <Item>WOMEN</Item>
        <Item>MEN</Item>
        <Item>BOYS</Item>
        <Item>GIRLS</Item>
      </Category>
      <Content>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div>{error}</div>
        ) : (
          galleries.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </Content>
    </Container>
  );
}
