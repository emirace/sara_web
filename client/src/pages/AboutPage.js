import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsGlobe, BsPhone } from "react-icons/bs";
import {
  FaInstagramSquare,
  FaPinterestSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div`
  height: 100%;
  margin: 30px 10vw;
  background: ${color.background2};
`;
const Col = styled.div`
  flex: 1;
`;
const Row = styled.div`
  display: flex;
`;
const RowItem = styled.div`
  display: flex;
  margin: 20px;
  align-items: center;
  & svg {
    margin-right: 10px;
    color: ${color.main};
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.div`
  font-weight: 200;
  font-size: 50px;
`;
const Detail = styled.div`
  padding: 30px;
`;

const Social = styled.div`
  margin-top: 20px;
  & svg {
    font-size: 40px;
    margin-right: 10px;
  }
`;
const More = styled.div`
  padding: 30px 10vw;
`;
export default function AboutPage() {
  return (
    <Container>
      <Row>
        <Col>
          <Image src="/images/p4.png" alt="img" />
        </Col>
        <Col>
          <Detail>
            <Title>About Us</Title>
            <p>
              Saralz Collection was founded by a young african woman who hails
              from Edo State, Nigeria. Her main passion is creating wears and
              accessories with african prints. The brand has been existing as a
              small scale business but was officially launched in 2022.
            </p>

            <div>
              <Row>
                <RowItem>
                  <BsPhone />
                  <div> Phone: +234875946</div>
                </RowItem>
                <RowItem>
                  <AiOutlineMail />
                  <div>Email: support@saralz.com</div>
                </RowItem>
              </Row>
              <Row>
                <RowItem>
                  <BsPhone />
                  <div>Phone: +234875946</div>
                </RowItem>
                <RowItem>
                  <BsGlobe />
                  <div>Website: www.saralz.com</div>
                </RowItem>
              </Row>
            </div>
            <Social>
              <GrFacebook color="#4267B2" />
              <FaTwitterSquare color="#1DA1F2" />
              <FaInstagramSquare color="#E1306C" />
              <FaPinterestSquare color="#E60023" />
              <FaWhatsappSquare color="#25D366" />
            </Social>
          </Detail>
        </Col>
      </Row>
      <More>
        <Title>The Brand</Title>
        <p>
          Saralz Collection is a fashion brand designed to promote Africa
          through fashion. Our wears are made with different fabrics mostly
          mixed with purely African prints to suit any occasion and also look
          classy and stylish. The brand spreads across different aspects of
          fashion like bags, accessories, wears, clothing and shoes. We aspire
          to be one of Africa's biggest fashion home, influencing style and
          fashion around the world with Ankara fabrics.
        </p>
        <Title>Our mission</Title>
        <p>
          We're in the business of making Ankara the new fashion whilst we work
          hard everyday as a team in sharing ideas that will benefit our
          customers and promote Africa to the world.
        </p>
        <Title>Our Aims</Title>
        <p>
          We not only aim to please our customers and portray the beauty of
          African wears and accessories to the world but we as a brand also aim
          to
          <ul>
            <li>
              provide jobs for talented youths who seek to showcase their love
              for fashion.
            </li>
            <li>promote African fashion</li>
            <li>impact the lives of youths around the world.</li>
          </ul>
        </p>
      </More>
    </Container>
  );
}
