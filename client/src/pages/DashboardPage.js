import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../component/dashboard/Profile";
import { GrGallery } from "react-icons/gr";
import { GrCatalog } from "react-icons/gr";
import { AiOutlineNotification } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { color } from "../constant/parameters";
import ProductList from "../component/dashboard/ProductList";
import { AiOutlineShopping } from "react-icons/ai";
import CatalogueList from "../component/dashboard/CatalogueList";
import GalleryList from "../component/dashboard/GalleryList";

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

      default:
        break;
    }
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
        <Option>
          <AiOutlineShopping /> Booked Orders
        </Option>
        <Option>
          <AiOutlineShopping /> Orders
        </Option>
        <Option
          onClick={() => {
            setTab("gallerylist");
            setShowMobileMenu(false);
          }}
        >
          <GrGallery color="plain" /> Galleries
        </Option>
        <Option
          onClick={() => {
            setTab("cataloguelist");
            setShowMobileMenu(false);
          }}
        >
          <GrCatalog /> Catalogues
        </Option>
        <Title>Notification</Title>
        <Option>
          <AiOutlineNotification /> NewsLetters
        </Option>
        <Option>
          <BiSupport /> Supports
        </Option>
        <Logout>Logout</Logout>
      </Sidebar>
      <Content showMobileMenu={showMobileMenu}>{displayTab(tab)}</Content>
    </Container>
  );
}
