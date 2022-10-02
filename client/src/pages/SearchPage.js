import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import styled from "styled-components";
import { color, colorStyles } from "../constant/parameters";

const Container = styled.div`
  padding: 5vw;
`;
const SearchCont = styled.div`
  display: flex;
  margin-bottom: 30px;
  height: 40px;
  align-items: center;
  background: ${color.border};
  justify-content: center;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  background: white;
  height: 80%;
  width: 80%;
  margin-left: 4px;
  & svg {
    margin: 0 10px;
  }
`;
const Input = styled.input`
  background: none;
  height: 100%;
  border: 0;
  flex: 1;
  &:focus-visible {
    outline: none;
  }
`;

const Content = styled.div`
  background: ${color.background2};
  padding: 10px;
  height: 500px;
`;

const Filter = styled.div`
  display: flex;
  background: ${color.border};
  justify-content: space-between;
  height: 40px;
  margin-bottom: 30px;
`;

const FilterCont = styled.div`
  display: flex;
  @media (max-width: 550px) {
    display: none;
  }
`;

const unit = [
  { value: "Category", label: "Category" },
  { value: "Corporate", label: "Corporate" },
  { value: "Owambe", label: "Owambe" },
];

export default function SearchPage() {
  return (
    <Container>
      <SearchCont>
        <Search>
          <IoSearchOutline color="black" />
          <Input type="text" placeholder="Search anything..." />
        </Search>
      </SearchCont>
      <Filter>
        <FilterCont>
          <Select options={unit} styles={colorStyles} />
          <Select options={unit} styles={colorStyles} />
          <Select options={unit} styles={colorStyles} />
          <Select options={unit} styles={colorStyles} />
        </FilterCont>
      </Filter>
      <Content>0 Result</Content>
    </Container>
  );
}
