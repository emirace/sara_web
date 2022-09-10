import React from "react";
import { GrFacebook } from "react-icons/gr";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  display: flex;
  & svg {
    margin: 0 10px;
    font-size: 40px;
    &:hover {
      cursor: pointer;
    }
  }
`;
export default function SocialLink() {
  return (
    <Container>
      <Content>
        <GrFacebook color="#4267B2" />
        <FaTwitterSquare color="#1DA1F2" />
        <FaInstagramSquare color="#E1306C" />
        <FaPinterestSquare color="#E60023" />
        <FaWhatsappSquare color="#25D366" />
      </Content>
    </Container>
  );
}
