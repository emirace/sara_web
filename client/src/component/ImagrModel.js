import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Image = styled.img`
  width: 100%;
`;
const SImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 0 5px;
  border: 1px solid ${color.main};
`;
const Row = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 5px;
  overflow-x: auto;
  background: #00000070;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function ImagrModel({ images }) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  console.log(images);
  return (
    <Container>
      <Image src={currentImage} alt="img" />
      <Row>
        {images.map((x, i) => (
          <SImage onClick={() => setCurrentImage(x)} src={x} alt="img" />
        ))}
      </Row>
    </Container>
  );
}
