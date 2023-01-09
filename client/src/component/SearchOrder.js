import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";

const Container = styled.div``;

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
export default function SearchOrder() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/bookorder/${input}`);
  };
  return (
    <Container>
      <SearchCont>
        <Search>
          <Input
            type="text"
            placeholder="Enter order Id"
            onChange={(e) => setInput(e.target.value)}
          />
          <IoSearchOutline color="black" onClick={handleSearch} />
        </Search>
      </SearchCont>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Container>
  );
}
