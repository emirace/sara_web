import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  width: calc((100vw - 10vw) / 4);
  position: relative;
  height: 480px;
  background: white;
  &:hover div {
    opacity: 0.8;
    height: 240px;
  }
  @media (max-width: 992px) {
    width: calc(100vw - 10vw);
  }
`;
const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: calc((100vw - 10vw) / 4);
  @media (max-width: 992px) {
    width: calc(100vw - 10vw);
  }
`;
const Details = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.3s;
  height: 0;
  width: 320px;
  background: ${color.main};
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const Content = styled.span`
  color: white;
  display: flex;
  justify-content: center;
  max-width: 150px;
  flex-wrap: wrap;
`;
const Name = styled.span`
  font-size: 30px;
  font-weight: 200;
  margin: 20px 0;
  text-align: center;
`;
const Detail = styled.span`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Key = styled.span`
  font-weight: bold;
`;
const Value = styled.span``;
export default function SlideItem({ product }) {
  const navigate = useNavigate();
  const detail = (key, value) => {
    return (
      <Detail>
        <Key>{key}</Key>
        <Value>{value}</Value>
      </Detail>
    );
  };
  return (
    <Container>
      <Image src={product.image} alt="img" />
      <Details onClick={() => navigate(`/product/${product.slug}`)}>
        <Name>{product.name}</Name>
        <Content>
          {detail("Size", product.size[0].value)}
          {detail("Category", product.category[0].value)}
        </Content>
      </Details>
    </Container>
  );
}
