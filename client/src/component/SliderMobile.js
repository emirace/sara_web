import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import styled from "styled-components";
import { color } from "../constant/parameters";
import SlideItem from "./SlideItem";

const Container = styled.div`
  position: relative;
  display: none;
  margin: 20px 0;
  @media (max-width: 992px) {
    display: block;
  }
`;
const Button = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color.border};
  border-radius: 50%;
  & svg {
    font-size: 20px;
  }
`;
const Content = styled.div`
  flex: 1;
  background: black;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-type: inline mandatory;
  transition: all 3s ease;

  & > * {
    scroll-snap-align: start;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Image = styled.img`
  width: 100%;
`;
export default function SliderMobile({ images }) {
  const sliderHandler = (direction) => {
    if (direction === "left") {
      var slider1 = document.getElementById("slider1");
      slider1.scrollBy(-100, 0);
    } else {
      var slider2 = document.getElementById("slider1");
      slider2.scrollBy(100, 0);
    }
  };
  return (
    <Container>
      {console.log(images)}
      <Button onClick={() => sliderHandler("left")} style={{ left: "5px" }}>
        <HiChevronLeft />
      </Button>
      <Content id="slider1">
        {images.map((i) => (
          <Image src={i} />
        ))}
      </Content>
      <Button onClick={() => sliderHandler("right")} style={{ right: "5px" }}>
        <HiChevronRight />
      </Button>
    </Container>
  );
}
