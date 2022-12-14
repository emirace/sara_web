import React from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Category = styled.div`
  display: flex;
  padding: 50px 0;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Item = styled.div`
  border: 1px solid;
  padding: 10px 8px;
  width: 100px;
  text-align: center;
  font-weight: 600;
  margin: 0 5px;
  font-size: 13px;
  cursor: pointer;
  &.active {
    background: ${color.main};
    border: 0;
  }
`;
export default function Filter({ setSelected, selected }) {
  return (
    <Category>
      <Item
        onClick={() => setSelected("ALL")}
        className={selected === "ALL" ? "active" : ""}
      >
        ALL
      </Item>
      <Item
        onClick={() => setSelected("WOMEN")}
        className={selected === "WOMEN" ? "active" : ""}
      >
        WOMEN
      </Item>
      <Item
        onClick={() => setSelected("MEN")}
        className={selected === "MEN" ? "active" : ""}
      >
        MEN
      </Item>
      <Item
        onClick={() => setSelected("BOYS")}
        className={selected === "BOYS" ? "active" : ""}
      >
        BOYS
      </Item>
      <Item
        onClick={() => setSelected("GIRLS")}
        className={selected === "GIRLS" ? "active" : ""}
      >
        GIRLS
      </Item>
    </Category>
  );
}
