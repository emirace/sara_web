import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  padding: 5vw;
  background: ${color.background2};
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;
const Col = styled.div`
  flex: 1;
  padding-right: 20px;
`;
const Logo = styled.h3``;
const Text = styled.p``;
const Header = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Ul = styled.div``;
const Li = styled.div`
  padding: 10px;
  color: ${color.main};
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: white;
  }
`;
const Image = styled.img`
  width: 300px;
  height: 200px;
`;

export default function Footer() {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <Col>
          <Logo>SARAH</Logo>
          <Text>
            Saralz is a clothing brand with an initiative to partner with
            creative minds with the aim of bringing the richness, beauty and
            value of African culture to other parts of the world. We display the
            vast use of African prints (popularly known as Ankara) to create and
            design pieces ranging from casual wears, corporate wears, party
            wears, mufflers, footwears, bags and accessories. The brand is also
            keen on preserving the conventional method that function in African
            tailor shop by availing to customers the possibility to book desired
            wears with required measurements to fit. We offer custom made
            outfits for your special occasions: wedding Guest(both sophisticated
            and simple Asoebi dresses), prom dresses, red carpet dresses, dinner
            dresses. Our outfit caters for both male and female demand. We also
            sell ready to wear handmade African clothing and accessories.
          </Text>
        </Col>
        <Col>
          <Header>Navigation</Header>
          <Ul>
            <Li onClick={() => navigate("/")}>HomePage</Li>
            <Li onClick={() => navigate("/gallery")}>Gallery</Li>
            <Li onClick={() => navigate("/catalogue")}>Catalogue</Li>
            <Li onClick={() => navigate("/bookorder")}>Book Order</Li>
            <Li onClick={() => navigate("/about")}>Contact Us</Li>
          </Ul>
        </Col>
        <Col>
          <Header>Usefull Link</Header>
          <Ul>
            <Li onClick={() => navigate("allproduct/")}>All Products</Li>
            <Li onClick={() => navigate("/accesories")}>Accesories</Li>
            <Li onClick={() => navigate("/bags")}>Bags</Li>
            <Li onClick={() => navigate("/casual")}>Casual</Li>
            <Li onClick={() => navigate("/owambe")}>Owambe</Li>
          </Ul>
        </Col>
        <Col>
          <Image src="/images/p4.png" />
        </Col>
      </Content>
    </Container>
  );
}
