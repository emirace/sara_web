import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Store } from "../Store";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
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
  const { state } = useContext(Store);
  const { location, userInfo } = state;
  const [isLoading, setIsLoading] = useState(true);
  const [sliderProduct, setSliderProduct] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const getSlider = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/products/slider/${location}`);
        if (data.success) {
          setSliderProduct(data.products);
        } else {
          console.log(data.message);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    getSlider();
  }, [userInfo, location]);

  const sliderHandler = (direction) => {
    if (direction === "left") {
      var slider1 = document.getElementById("slider1");
      slider1.scrollBy(-100, 0);
    } else {
      var slider2 = document.getElementById("slider1");
      slider2.scrollBy(100, 0);
    }
  };
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : !sliderProduct.length ? (
    <MessageBox>No product Found</MessageBox>
  ) : (
    <Container>
      <Button onClick={() => sliderHandler("left")}>PREV</Button>
      <Content id="slider1">
        {sliderProduct.map((product) => (
          <SlideItem product={product} key={product._id} />
        ))}
      </Content>
      <Button onClick={() => sliderHandler("right")}>NEXT</Button>
    </Container>
  );
}
