import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
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
export default function BookOrderList({ setShowMobileMenu }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookorders, setBookOrders] = useState([]);
  useEffect(() => {
    const getBookOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/bookorders/", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);
        setBookOrders(data.bookOrders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getBookOrders();
  }, [userInfo]);

  return (
    <Container>
      <h1>Order Lists</h1>
      <Back
        onClick={() => {
          setShowMobileMenu(true);
        }}
      >
        <BiChevronLeft />
        Back
      </Back>
      <SearchCont>
        <Search>
          <IoSearchOutline color="black" />
          <Input type="text" />
        </Search>
      </SearchCont>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Content>
          <Trow>
            <Thead>ID</Thead>
            <Thead>STYLE TYPE</Thead>
            <Thead>PRICE</Thead>
            <Thead>DATE</Thead>
            <Thead>ACTION</Thead>
          </Trow>
          {bookorders.map((order) => (
            <Trow>
              <Tdata>{order._id}</Tdata>
              <Tdata style={{ textTransform: "capitalize" }}>
                {order.styleType}
              </Tdata>
              <Tdata>{order.price}</Tdata>
              <Tdata>{order.createdAt}</Tdata>
              <Tdata>
                <View onClick={() => navigate(`/bookorder/${order._id}`)}>
                  View
                </View>
              </Tdata>
            </Trow>
          ))}
        </Content>
      )}
    </Container>
  );
}
