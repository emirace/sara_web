import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;
const Image = styled.img`
  width: 100%;
  margin-bottom: 15px;
`;
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;
const Details = styled.p`
  margin-bottom: 15px;
`;
const Tap = styled.span`
  border-bottom: 1px solid;
  font-size: 12px;
  opacity: 0.6;
`;
export default function DisplayContent({ image, title, tap, detail }) {
  return (
    <Container>
      <Image src={image} alt="items" />
      <Title>{title}</Title>
      <Details>{detail}</Details>
      <Link to="/">
        <Tap>{tap}</Tap>
      </Link>
    </Container>
  );
}
