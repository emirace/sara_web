import React from "react";
import styled from "styled-components";
import SlideItem from "./SlideItem";

const Container = styled.div`
  display: flex;
  margin: 20px 0;
`;
const Button = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  width: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
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
export default function Slider() {
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
      <Button onClick={() => sliderHandler("left")}>PREV</Button>
      <Content id="slider1">
        <SlideItem image="/images/p1.jpg" />
        <SlideItem image="/images/p2.jpg" />
        <SlideItem image="/images/p3.jpg" />
        <SlideItem image="/images/p1.jpg" />
        <SlideItem image="/images/p2.jpg" />
        <SlideItem image="/images/p3.jpg" />
      </Content>
      <Button onClick={() => sliderHandler("right")}>NEXT</Button>
    </Container>
  );
}
