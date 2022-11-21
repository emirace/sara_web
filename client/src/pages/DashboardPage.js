import React, { useContext, useState } from "react";
import styled from "styled-components";
import Profile from "../component/dashboard/Profile";
import { BsImages } from "react-icons/bs";
import { AiOutlineNotification } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { BiBookOpen, BiSupport } from "react-icons/bi";
import { color } from "../constant/parameters";
import ProductList from "../component/dashboard/ProductList";
import { AiOutlineShopping } from "react-icons/ai";
import CatalogueList from "../component/dashboard/CatalogueList";
import GalleryList from "../component/dashboard/GalleryList";
import OrderList from "../component/dashboard/OrderList";
import BookOrderList from "../component/dashboard/BookOrderList";
import { Store } from "../Store";

const Container = styled.div`
  display: flex;
`;
const Sidebar = styled.div`
  flex: 1;
  margin: 20px 0;
  padding: 10px 30px;
  background: ${color.background2};
  @media (max-width: 500px) {
    display: ${(props) => (props.showMobileMenu ? "block" : "none")};
  }
`;
const Content = styled.div`
  flex: 4;
  margin: 20px;
  @media (max-width: 500px) {
    display: ${(props) => (!props.showMobileMenu ? "block" : "none")};
  }
`;

const Option = styled.div`
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  & svg {
    margin-right: 5px;
    color: white;
    font-size: 18px;
  }
  &:hover {
    background: ${color.main};
  }
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
`;
const Logout = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 10px;
  &:hover {
    background: ${color.main};
  }
`;
export default function DashboardPage() {
  const { dispatch: ctxDispatch } = useContext(Store);
  const [tab, setTab] = useState("profile");
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  const displayTab = (item) => {
    switch (item) {
      case "profile":
        return <Profile setShowMobileMenu={setShowMobileMenu} />;
      case "productlist":
        return <ProductList setShowMobileMenu={setShowMobileMenu} />;
      case "cataloguelist":
        return <CatalogueList setShowMobileMenu={setShowMobileMenu} />;
      case "gallerylist":
        return <GalleryList setShowMobileMenu={setShowMobileMenu} />;
      case "orderlist":
        return <OrderList setShowMobileMenu={setShowMobileMenu} />;
      case "bookorderlist":
        return <BookOrderList setShowMobileMenu={setShowMobileMenu} />;

      default:
        break;
    }
  };

  const logout = () => {
    console.log("hello");
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <Container>
      <Sidebar showMobileMenu={showMobileMenu}>
        <Title>Dashboard</Title>
        <Option
          onClick={() => {
            setTab("profile");
            setShowMobileMenu(false);
          }}
        >
          <AiOutlineUser /> Profile
        </Option>
        <Option
          onClick={() => {
            setTab("productlist");
            setShowMobileMenu(false);
          }}
        >
          <AiFillShopping /> Products
        </Option>
        <Option
          onClick={() => {
            setTab("bookorderlist");
            setShowMobileMenu(false);
          }}
        >
          <AiOutlineShopping /> Item Booked
        </Option>
        <Option
          onClick={() => {
            setTab("orderlist");
            setShowMobileMenu(false);
          }}
        >
          <AiOutlineShopping />
          Product Orders
        </Option>
        <Option
          onClick={() => {
            setTab("gallerylist");
            setShowMobileMenu(false);
          }}
        >
          <BsImages color="plain" /> Galleries
        </Option>
        <Option
          onClick={() => {
            setTab("cataloguelist");
            setShowMobileMenu(false);
          }}
        >
          <BiBookOpen /> Catalogues
        </Option>
        <Title>Notification</Title>
        <Option>
          <AiOutlineNotification /> NewsLetters
        </Option>
        <Option>
          <BiSupport /> Supports
        </Option>
        <Logout onClick={logout}>Logout</Logout>
      </Sidebar>
      <Content showMobileMenu={showMobileMenu}>{displayTab(tab)}</Content>
    </Container>
  );
}
