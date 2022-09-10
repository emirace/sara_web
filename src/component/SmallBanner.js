import React from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Image = styled.img`
  width: 80%;
  height: 100px;

  object-fit: cover;
  object-position: center;
`;
const Details = styled.div`
  position: absolute;
  left: 15%;
`;
const BigText = styled.div`
  font-size: 35px;
  font-weight: 200;
  color: white;
  text-shadow: #000 1px 0 10px;
`;
const SmallText = styled.div`
  color: white;
  padding: 10px;
  background: ${color.main};
  border-radius: 0.2rem;
  display: inline-block;
`;
export default function SmallBanner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Image src="/images/banner.jpg" alt="img" />
      <Details>
        <BigText>Have something else in Mind</BigText>
        <SmallText>Contact us now to know how!</SmallText>
      </Details>
    </div>
  );
}
