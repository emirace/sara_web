import React, { useState } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { color } from "../constant/parameters";
import { useNavigate } from "react-router-dom";
import Model from "./Model";

const Container = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 10px 30px;
  margin-bottom: 15px;
`;
const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;
const Text = styled.div`
  padding: 10px;
  font-weight: 400;
  font-size: 25px;
  text-align: center;
  z-index: 1;
  transition: all 0.5s;
  text-transform: capitalize;
  margin-top: -3px;
`;

const Overlay = styled.span`
  width: 100%;
  height: 100%;
  opacity: 0.2;
  transition: all 0.5s;
  position: absolute;
  top: 0;
  left: 0;
`;

const ButtonCont = styled.div`
  display: flex;
`;
const IconCont = styled.div`
  border: 1px solid #fff;
  margin: 0 5px 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  cursor: pointer;
  & svg {
    font-size: 20px;
    color: white;
  }
  &:hover {
    background: white;
  }
  &:hover svg {
    color: ${color.main};
  }
`;
const Request = styled.div`
  /* position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%); */
  background: ${color.main};
  color: #fff;
  margin: 0 5px 3px 5px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: ${color.main};
  }
`;
const ModelImg = styled.img`
  min-width: 100%;
`;

export default function Product({ product }) {
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const bookoutfit = (image) => {
    navigate(`/bookorder?style=${image}`);
  };
  return (
    <Container>
      <Image src={`/images/${product.src}`} alt="img" />
      <ButtonCont>
        <IconCont onClick={() => setShowModel(true)}>
          <IoSearchOutline />
        </IconCont>
        <Request onClick={() => bookoutfit(product.src)}>BOOK OUTFIT</Request>
      </ButtonCont>
      <Model showModel={showModel} setShowModel={setShowModel}>
        <ModelImg src={`/images/${product.src}`} alt="img" />
      </Model>
    </Container>
  );
}
