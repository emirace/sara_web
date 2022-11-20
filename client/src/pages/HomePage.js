import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import About from "../component/About";
import DisplayContent from "../component/DisplayContent";
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
  @media (max-width: 992px) {
    padding-bottom: 40px;
  }
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

const HalfSection = styled.div`
  width: 50%;
  @media (max-width: 992px) {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
export default function HomePage() {
  return (
    <Container>
      <Section>
        <Slider />
      </Section>
      <Section>
        <Row>
          <HalfSection>
            <DisplayContent
              image="https://res.cloudinary.com/emirace/image/upload/v1668880153/IMG-20221114-WA0034_l9mgmt.jpg"
              tap="Explore more"
              detail="Discover our roundup of effortless-chic looks that will dial up festive glamour"
              title="Ways to wear"
            />
          </HalfSection>
          <HalfSection>
            <DisplayContent
              image="https://res.cloudinary.com/emirace/image/upload/v1668879567/IMG-20221114-WA0031_eiepv5.jpg"
              tap="Shop bags"
              detail="Find your perfect plus-one with edit of clutches, pouches and more ultra - covetable pieces"
              title="Bags of style"
            />
          </HalfSection>
        </Row>
      </Section>
      <Section>
        <SmallBanner />
      </Section>
      <Section>
        <Title>Our Products</Title>

        <ProductList />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/allproduct">
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
