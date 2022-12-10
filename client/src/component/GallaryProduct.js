import React, { useContext, useState } from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import Model from "./Model";
import SliderMobile from "./SliderMobile";
import ImagrModel from "./ImagrModel";
import { discountPrice } from "../utils/utils";

const Product = styled.div`
  width: 100%;
  position: relative;
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

const ImageCont = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  @media (max-width: 992px) {
    height: 300px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const IconCont = styled.div`
  position: relative;
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
  background: ${color.main};
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
  z-index: 5;
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

  @media (max-width: 992px) {
    & svg {
      font-size: 16px;
    }
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

const Price = styled.div`
  font-size: 11px;
  font-weight: 600;
  background: white;
  color: ${color.main};
  padding: 5px 7px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Discount = styled.span`
  color: grey;
  text-decoration: line-through;
  font-weight: 300;
  margin-left: 10px;
  font-size: 9px;
`;

export default function GallaryProduct({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { location } = state;
  const [showModel, setShowModel] = useState(false);

  const addToCart = (product) => {
    ctxDispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Product>
      <ImageCont>
        <Image src={`${product.image}`} alt="img" />
        <Price>
          {location === "NG" ? "NGN" : "EUR"}
          {discountPrice(product, location)}
          {product.discount && (
            <Discount>
              {location === "NG" ? "NGN" : "EUR"}
              {location === "NG"
                ? product.priceNigeria.toFixed(2)
                : product.price.toFixed(2)}
            </Discount>
          )}
        </Price>
      </ImageCont>
      <Link to={`/product/${product.slug}`}>
        <Name className="name">{product.name}</Name>
      </Link>
      <IconCont>
        <Icon className="icon" onClick={() => setShowModel(true)}>
          <IoSearchOutline />
        </Icon>
        <Icon onClick={() => addToCart(product)} className="icon">
          <AiOutlineShopping />
        </Icon>
        <Blur className="icons" />
      </IconCont>
      <Model setShowModel={setShowModel} showModel={showModel}>
        <SliderMobile images={[product.image, ...product.images]} />
        <ImagrModel images={[product.image, ...product.images]} />
      </Model>
    </Product>
  );
}
