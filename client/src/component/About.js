import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;
const Detail = styled.div`
  position: absolute;
  left: 50%;
  top: 50px;
  max-width: 400px;
  @media (max-width: 480px) {
    left: 35%;
  }
`;
const Text = styled.div`
  font-size: 50px;
`;
const SmallText = styled.p`
  font-weight: 200;
  padding-right: 20px;
  text-align: justify;
`;
const Button = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 5px 7px;
  border: 1px solid;
  &:hover {
    border-color: ${color.main};
  }
`;
export default function About() {
  return (
    <div style={{ position: "relative" }}>
      <Image src="/images/about.jpg" alt="" />
      <Detail>
        <Text>About Us</Text>
        <SmallText>
          Saralz Collection was founded by a young african woman who hails from
          Edo State, Nigeria. Her main passion is creating wears and accessories
          with african prints. The brand has been existing as a small scale
          business but was officially launched in 2022.
        </SmallText>
        <Link to="/about">
          <Button>Read more</Button>
        </Link>
      </Detail>
    </div>
  );
}
