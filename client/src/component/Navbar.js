import React, { useContext } from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";
import { HiSearch } from "react-icons/hi";

import { Link } from "react-router-dom";
import { color } from "../constant/parameters";
import MobileMenu from "./MobileMenu";
import { AiOutlineShopping } from "react-icons/ai";
import { Store } from "../Store";

const Container = styled.div`
  padding: 0 5vw;
  background: ${color.background2};
  & a {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    padding: 0 0;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Row1 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  @media (max-width: 991px) {
    display: none;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  & svg {
    cursor: pointer;
    margin: 0 10px;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
const Center1 = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  & svg {
    cursor: pointer;
    margin: 0 10px;
  }
`;
const Right = styled.div`
  justify-content: end;
  flex: 1;
  align-items: center;
  display: flex;
  & svg {
    cursor: pointer;
    margin: 0 10px;
  }
`;

const Switch = styled.input.attrs({
  type: "checkbox",
  id: "darkmodeSwitch",
  role: "switch",
})`
  position: relative;
  margin: 0 5px;
  width: 30px;
  height: 15px;
  -webkit-appearance: none;
  background: #fff;
  border-radius: 20px;
  outline: none;
  transition: 0.5s;
  @media (max-width: 992px) {
  }

  &:checked {
    background: #fff;
    &:before {
      left: 15px;
      background: #000;
    }
  }
  &:before {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background: #000;
    transition: 0.5s;
  }
`;

const Li = styled.div`
  margin: 0 15px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: ${color.main};
  }
`;
const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${color.main};
`;

const Order = styled.span`
  background: ${color.main};
  color: white;
  padding: 5px 7px;
  display: block;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: black;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  width: 13px;
  height: 13px;
  text-align: center;
  font-size: 10px;
  margin: auto;
  border-radius: 50%;
  background: ${color.main};
`;

const Logo = styled.img`
  height: 100px;
  cursor: pointer;
  @media (max-width: 500px) {
    display: none;
  }
`;

const LogoM = styled.img`
  height: 70px;
  cursor: pointer;
  display: none;
  @media (max-width: 500px) {
    display: block;
  }
`;

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { mode, cart, userInfo } = state;

  const darkMode = (mode1) => {
    if (mode1) {
      ctxDispatch({ type: "CHANGE_MODE", payload: "darkmode" });
      localStorage.setItem("mode", "darkmode");
    } else {
      ctxDispatch({ type: "CHANGE_MODE", payload: "lightmode" });
      localStorage.setItem("mode", "lightmode");
    }
  };
  const signout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };
  return (
    <Container>
      <Row style={{ borderBottom: "1px solid" }}>
        <Left>
          <BiSun />
          <Switch
            checked={mode === "darkmode"}
            onChange={(e) => darkMode(e.target.checked)}
          ></Switch>
          <BiMoon />
        </Left>
        <Center>
          <FaFacebookF color="#4267B2" />
          <FaTwitter color="#1DA1F2" />
          <FaInstagram color="#E1306C" />
          <FaPinterestP color="#E60023" />
          <BsWhatsapp color="#25D366" />
        </Center>
        <Right>
          {userInfo && (
            <>
              <GiExitDoor onClick={signout} />
              <Link to="/dashboard">
                <FaRegUser />
              </Link>
            </>
          )}
          <Link to="/search">
            <HiSearch />
          </Link>
        </Right>
      </Row>

      <Row>
        <Left>
          <Link to="/">
            <LogoM src="/images/saralzwhite.png" alt="logo" />
          </Link>
          <Link to="/">
            <Logo src="/images/saralzwhite.png" alt="logo" />
          </Link>
        </Left>
        <Center1>
          <MobileMenu />
          <Row1>
            <Li>
              <Link to="/">HOME</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/gallery">GALLARY</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/catalogue">CATALOGUE</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/casual">CASUAL</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/corporate">CORPERATE</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/owambe">OWAMBE</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/accessories">ACCESSORIES</Link>
            </Li>
            <Dot />
            <Li>
              <Link to="/bags">BAGS</Link>
            </Li>
          </Row1>
        </Center1>
        <Right>
          <Link to="cart">
            <div style={{ position: "relative" }}>
              <AiOutlineShopping
                color={color.main}
                style={{ fontSize: "30px" }}
              />
              {cart.length > 0 && <Badge>{cart.length}</Badge>}
            </div>
          </Link>

          <Link to="bookorder">
            <Order>ORDER </Order>
          </Link>
        </Right>
      </Row>
    </Container>
  );
}
