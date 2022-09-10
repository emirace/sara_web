import React from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  width: 320px;
  position: relative;
  height: 480px;
  background: white;
  &:hover div {
    opacity: 0.8;
    height: 240px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const Image = styled.img`
  object-fit: cover;
  height: 100%;
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
export default function SlideItem({ image }) {
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
      <Image src={image} alt="img" />
      <Details>
        <Name>NAME</Name>
        <Content>
          {detail("Size", "36")}
          {detail("Size", "36")}
          {detail("Size", "36")}
          {detail("Size", "36")}
        </Content>
      </Details>
    </Container>
  );
}
