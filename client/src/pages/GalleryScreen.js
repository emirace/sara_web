import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CollapseText from "../component/CollapseText";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Product from "../component/Product";
import { color } from "../constant/parameters";

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
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 5px;
  }
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
      <CollapseText number={150}>
        Hello, esteemed customers. We are happy to welcome you to the Saralz
        Collection Gallery. This section here, provides you with a detailed
        description of all our products strictly from Saralz Collection. Here,
        you can place an order on any of our product(s) as displayed on here.
        Should you seek advice or request for information, please do well to
        send us a message. We look forward to working with you!
      </CollapseText>
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
        ) : !galleries.length ? (
          <MessageBox>No Image Found</MessageBox>
        ) : (
          galleries.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </Content>
    </Container>
  );
}
