import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import { color, colorStyles } from "../../constant/parameters";

const Container = styled.div``;
const SearchCont = styled.div`
  display: flex;
  margin-bottom: 30px;
  height: 40px;
  align-items: center;
  background: ${color.border};
`;
const Filter = styled.div`
  display: flex;
  background: ${color.border};
  justify-content: space-between;
  height: 40px;
`;
const Input = styled.input`
  background: none;
  height: 100%;
  border: 0;
  width: 300px;
  &:focus-visible {
    outline: none;
  }
`;
const Button = styled.div`
  cursor: pointer;
  background: ${color.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: white;
  &:hover {
    color: black;
  }
  @media (max-width: 550px) {
    margin-left: auto;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background: white;
  height: 80%;
  margin-left: 4px;
  & svg {
    margin: 0 10px;
  }
`;

const FilterCont = styled.div`
  display: flex;
  @media (max-width: 550px) {
    display: none;
  }
`;

const Back = styled.div`
  display: none;
  align-items: center;
  padding: 0 10px;

  & svg {
    font-size: 20px;
  }
  @media (max-width: 550px) {
    display: flex;
  }
`;
const unit = [
  { value: "Category", label: "Category" },
  { value: "Corporate", label: "Corporate" },
  { value: "Owambe", label: "Owambe" },
];
export default function CatalogueList({ setShowMobileMenu }) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Catalogue Lists</h1>
      <SearchCont>
        <Search>
          <IoSearchOutline color="black" />
          <Input type="text" />
        </Search>
      </SearchCont>
      <Filter>
        <FilterCont>
          <Select options={unit} styles={colorStyles} />
          <Select options={unit} styles={colorStyles} />
          <Select options={unit} styles={colorStyles} />
          <Select options={unit} styles={colorStyles} />
        </FilterCont>
        <Back
          onClick={() => {
            setShowMobileMenu(true);
          }}
        >
          <BiChevronLeft />
          Back
        </Back>
        <Button onClick={() => navigate("/add/catalogue")}>Add Image</Button>
      </Filter>
    </Container>
  );
}
