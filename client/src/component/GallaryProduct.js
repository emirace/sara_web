import React, { useContext } from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { Store } from "../Store";
import { Link } from "react-router-dom";

const Product = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  &:hover .icons {
    opacity: 0.2;
  }
  &:hover .icon {
    opacity: 1;
  }
  &:hover .name {
    background: ${color.main};
    color: black;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;
const IconCont = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
`;

const Blur = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: red;
  width: 100%;
  transition: all 0.3s ease-in;
  height: 100%;
  opacity: 0;
`;

const Icon = styled.div`
  transition: all 0.3s ease-in;
  border: 1px solid #fff;
  padding: 10px;
  margin: 2px;
  cursor: pointer;
  opacity: 0;
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

const Name = styled.div`
  font-weight: 400;
  transition: all 0.3s ease-in;
  font-size: 20px;
  text-transform: capitalize;
  text-align: center;
  padding: 10px;
  color: white;
  margin-top: -3px;
`;
export default function GallaryProduct({ product }) {
  const { dispatch: ctxDispatch } = useContext(Store);
  const addToCart = (product) => {
    ctxDispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Product>
      <Image src={`${product.image}`} alt="img" />
      <Name className="name">{product.name}</Name>
      <Link to={`/product/${product.slug}`}>
        <Blur className="icons" />
      </Link>
      <IconCont>
        <Icon className="icon">
          <IoSearchOutline />
        </Icon>
        <Icon className="icon">
          <AiOutlineShopping onClick={() => addToCart(product)} />
        </Icon>
      </IconCont>
    </Product>
  );
}
