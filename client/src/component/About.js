import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";
import CollapseText from "./CollapseText";

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
        {/* <SmallText> */}
        <CollapseText number={400}>
          Saralz is a clothing brand with an initiative to partner with creative
          minds with the aim of bringing the richness, beauty and value of
          African culture to other parts of the world. We display the vast use
          of African prints (popularly known as Ankara) to create and design
          pieces ranging from casual wears, corporate wears, party wears,
          mufflers, footwears, bags and accessories. The brand is also keen on
          preserving the conventional method that function in African tailor
          shop by availing to customers the possibility to book desired wears
          with required measurements to fit. We offer custom made outfits for
          your special occasions: wedding Guest(both sophisticated and simple
          Asoebi dresses), prom dresses, red carpet dresses, dinner dresses. Our
          outfit caters for both male and female demand. We also sell ready to
          wear handmade African clothing and accessories.
        </CollapseText>

        <Link to="/about">
          <Button>About Us</Button>
        </Link>
      </Detail>
    </div>
  );
}
