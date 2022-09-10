import React from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Detail = styled.div`
  position: absolute;
  left: 50%;
  top: 30px;
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
          ultricies felis, sed posuere orci. Donec metus lectus, fringilla id
          dignissim non, pulvinar sed nibh. Donec eleifend tortor mauris, ac
          sodales diam blandit non. Proin tempor lectus odio, a semper erat
          convallis eget. Mauris nibh augue, mattis vel condimentum in,
          tincidunt ac velit. Morbi aliquet nisl in nisl posuere, eget euismod
          nulla lobortis. Nunc sagittis dictum velit egestas malesuada.
        </SmallText>
        <SmallText>
          Suspendisse potenti. Curabitur blandit felis eget augue elementum
          pellentesque. Sed sed bibendum magna. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Duis eget nisi
          risus. Sed et posuere nibh, vel tristique tortor. Cras in nibh dui.
          Phasellus faucibus posuere orci in placerat. Phasellus interdum id
          tellus non dignissim. Aenean et augue ante. Cras ornare faucibus ante
          ut condimentum. Praesent luctus lacus non venenatis sodales. Duis
          sapien leo, mattis eget consectetur sed, congue mollis elit.
        </SmallText>
        <Button>Read more</Button>
      </Detail>
    </div>
  );
}
