import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { color } from "../constant/parameters";

const Container = styled.div`
  padding: 0 5vw;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  & svg {
    cursor: pointer;
    margin: 0 10px;
  }
`;
const Right = styled.div`
  justify-content: end;
  flex: 1;
  display: flex;
  & svg {
    cursor: pointer;
    margin: 0 10px;
  }
`;
const Li = styled.div`
  margin: 0 15px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: ${color.main};
  }
`;
const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${color.main};
`;

const Order = styled.span`
  color: ${color.main};
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
`;
export default function Navbar() {
  return (
    <Container>
      <Row style={{ borderBottom: "1px solid" }}>
        <Left>Switch</Left>
        <Center>
          <FaFacebookF color="#4267B2" />
          <FaTwitter color="#1DA1F2" />
          <FaInstagram color="#E1306C" />
          <FaPinterestP color="#E60023" />
          <BsWhatsapp color="#25D366" />
        </Center>
        <Right>
          <GiExitDoor />
          <FaRegUser />
          <HiSearch />
        </Right>
      </Row>

      <Row>
        <Left>SARAH</Left>
        <Center>
          <Row>
            <Li>
              <Link to="/">HOME</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/gallery">GALLARY</Link>
            </Li>
            <Dot />
            <Li>CATALOGUE</Li>
            <Dot />
            <Li>CASUAL</Li>
            <Dot />
            <Li>COROPERATE</Li>
            <Dot />
            <Li>OWAMBE</Li>
            <Dot />
            <Li>ACCESORIES</Li>
            <Dot />
            <Li>BAGS</Li>
          </Row>
        </Center>
        <Right>
          <Order>ORDER WEAR</Order>
        </Right>
      </Row>
    </Container>
  );
}
