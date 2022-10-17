import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import { color } from "../../constant/parameters";
import { Store } from "../../Store";
import LoadingBox from "../LoadingBox";

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

const Content = styled.div`
  background: ${color.border};
  height: 100%;
  margin: 20px 0;
`;

const Trow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
const Thead = styled.div`
  font-weight: bold;
  flex: 1;
  padding: 5px 20px;
  background: black;
`;
const Tdata = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const View = styled.div`
  color: ${color.main};
  cursor: pointer;
  padding: 5px 7px;
`;

const unit = [
  { value: "Category", label: "Category" },
  { value: "Corporate", label: "Corporate" },
  { value: "Owambe", label: "Owambe" },
];
export default function CatalogueList({ setShowMobileMenu }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const colorStyles = {
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: "#000",
        width: "150px",
        borderColor: isFocused ? color.main : color.border,
        boxShadow: color.main,
        color: "white",
      };
    },
    menu: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? color.border : "black",
      color: "white",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? color.main
          : isFocused
          ? color.border
          : "black",
        color: isDisabled ? "#ccc" : isSelected ? "white" : "white",

        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? color.main
              : color.border
            : undefined,
        },
      };
    },
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [catalogues, setCatalogues] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const getCatalogues = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/catalogues/", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);
        setCatalogues(data.catalogues);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getCatalogues();
  }, [userInfo, refresh]);

  const deletehandle = async (catalogueId) => {
    try {
      setLoadingDelete(true);
      const { data } = await axios.delete(`/api/catalogues/${catalogueId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (data.success) {
        setRefresh(!refresh);
      }
      setLoadingDelete(false);
    } catch (err) {
      setLoadingDelete(false);
    }
  };

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
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Content>
          <Trow>
            <Thead>ID</Thead>
            <Thead>NAME</Thead>
            <Thead>ACTION</Thead>
          </Trow>
          {catalogues.map((catalogue) => (
            <Trow>
              <Tdata>{catalogue._id}</Tdata>
              <Tdata>{catalogue.name}</Tdata>
              <Tdata>
                <div style={{ display: "flex" }}>
                  <View onClick={() => navigate(`/catalogue/${catalogue._id}`)}>
                    View
                  </View>
                  <View onClick={() => deletehandle(catalogue._id)}>
                    Delete
                  </View>
                  {loadingDelete && <LoadingBox />}
                </div>
              </Tdata>
            </Trow>
          ))}
        </Content>
      )}
    </Container>
  );
}
