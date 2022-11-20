import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;
const Detail = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.div`
  font-size: 50px;
  font-weight: 200;
  text-align: center;
`;
const SmallText = styled.p`
  font-weight: 200;
  padding: 0 10px;
  text-align: justify;
  max-width: 800px;
  text-align: center;
`;
const Button = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 45px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color.main};
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  :hover {
    color: black;
  }

  &:hover {
    border-color: ${color.main};
  }
`;
const Input = styled.input`
  height: 40px;
  width: 500px;
  padding: 0 5px;
  border: 0;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  &:focus-visible {
    outline: none;
  }
  @media (max-width: 480px) {
    width: 280px;
  }
`;
const Row = styled.div`
  display: flex;
`;
export default function Newslatter() {
  return (
    <div style={{ position: "relative" }}>
      <Image
        src="https://res.cloudinary.com/emirace/image/upload/v1668884159/IMG-20221114-WA0033_owijje.jpg"
        alt="image"
      />
      <Detail>
        <Text>Get Update of Lattest Product</Text>
        <SmallText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
          ultricies felis, sed posuere orci. Donec metus lectus, fringilla id
          dignissim non, pulvinar sed nibh. Donec eleifend tortor mauris, ac
          sodales diam blandit non. Proin tempor lectus odio, a semper erat
          convallis eget. Mauris nibh augue, mattis vel condimentum in,
          tincidunt ac velit. Morbi aliquet nisl in nisl posuere, eget euismod
          nulla lobortis. Nunc sagittis dictum velit egestas malesuada.
        </SmallText>
        <Row>
          <Input placeholder="Enter your Email" />
          <Button>
            <AiOutlineEdit />
          </Button>
        </Row>
      </Detail>
    </div>
  );
}
