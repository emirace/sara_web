import React from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  padding: 0 5vw;
`;
const Content = styled.div`
  display: flex;
`;
const Col = styled.div`
  flex: 1;
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
  return (
    <Container>
      <Content>
        <Col>
          <Logo>SARAH</Logo>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            eget ultricies felis, sed posuere orci. Donec metus lectus,
            fringilla id dignissim non, pulvinar sed ni
          </Text>
        </Col>
        <Col style={{ paddingLeft: "20px" }}>
          <Header>Navigation</Header>
          <Ul>
            <Li>HomePage</Li>
            <Li>Gallery</Li>
            <Li>Catalogue</Li>
            <Li>Book Order</Li>
            <Li>Contact Us</Li>
          </Ul>
        </Col>
        <Col>
          <Header>Usefull Link</Header>
          <Ul>
            <Li>All Products</Li>
            <Li>Accesories</Li>
            <Li>Bags</Li>
            <Li>Casual</Li>
            <Li>Owambe</Li>
          </Ul>
        </Col>
        <Col>
          <Image src="/images/p4.png" />
        </Col>
      </Content>
    </Container>
  );
}
