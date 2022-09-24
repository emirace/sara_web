import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import About from "../component/About";
import Footer from "../component/Footer";
import Newslatter from "../component/Newslatter";
import ProductList from "../component/ProductList";
import Slider from "../component/Slider";
import SmallBanner from "../component/SmallBanner";
import SocialLink from "../component/SocialLink";
import { color } from "../constant/parameters";

const Container = styled.div``;
const Section = styled.div`
  padding-bottom: 70px;
`;
const Button = styled.div`
  align-self: center;
  background: ${color.main};
  cursor: pointer;
  padding: 5px 7px;
  display: inline-block;
  font-size: 15px;
  &:hover {
    color: black;
  }
`;
const Title = styled.div`
  font-size: 50px;
  margin: 0 5vw 10px 5vw;
  text-transform: capitalize;
  text-align: center;
`;
export default function HomePage() {
  return (
    <Container>
      <Section>
        <Slider />
      </Section>
      <Section>
        <SmallBanner />
      </Section>
      <Section>
        <Title>Our Products</Title>

        <ProductList />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/gallery">
            <Button>VIEW ALL</Button>
          </Link>
        </div>
      </Section>
      <Section>
        <About />
        <Newslatter />
      </Section>
      <Section>
        <SocialLink />
      </Section>
    </Container>
  );
}
