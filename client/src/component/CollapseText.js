import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import { color } from "../constant/parameters";

const SmallText = styled.p`
  font-weight: 200;
  padding-right: 20px;
  text-align: justify;
`;
export default function CollapseText({ children, number }) {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <SmallText>
      {isReadMore ? text.slice(0, number) : text}
      <span onClick={toggleReadMore} style={{ color: color.main }}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </SmallText>
  );
}
