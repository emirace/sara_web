import React from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 10px 30px;
  &:hover div {
    background: ${color.main};
  }
  &:hover span {
    background: ${color.main};
  }
`;
const Image = styled.img`
  width: 190px;
`;
const Text = styled.div`
  padding: 10px;
  font-weight: 400;
  font-size: 25px;
  text-align: center;
  z-index: 1;
  transition: all 0.5s;
  text-transform: capitalize;
`;

const Overlay = styled.span`
  width: 190px;
  height: 284px;
  opacity: 0.6;
  transition: all 0.5s;
  position: absolute;
  top: 0;
  left: 0;
`;
export default function Product({ image, name }) {
  return (
    <Container>
      <Image src={image} alt="img" />
      <Text>{name}</Text>
      <Overlay />
    </Container>
  );
}
