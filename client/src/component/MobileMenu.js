import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: block;
  }
`;
const MenuButton = styled.div`
  & svg {
    padding: 8px;
    border: 1px solid ${color.main};
  }
`;
const MenuCont = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background: ${color.background};
`;
const Li = styled.div`
  margin: 20px 20px 20px 40px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  &:hover {
    color: ${color.main};
  }
  & svg {
    font-size: 18px;
    font-weight: 600;
  }
`;
const Top = styled.div`
  background: ${color.main};
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
  display: flex;
  justify-content: end;
  align-items: center;
  & svg {
    font-size: 20px;
    font-weight: 500;
  }
`;

const CloseCont = styled.div`
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 8px;
  & svg {
    margin: 0;
  }
`;

export default function MobileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Container>
      <MenuButton>
        <FiMenu onClick={() => setShowMenu(true)} color={color.main} />
      </MenuButton>
      {showMenu && (
        <MenuCont>
          <Top>
            <CloseCont>
              <AiOutlineClose
                onClick={() => setShowMenu(false)}
                color="white"
              />
            </CloseCont>
          </Top>
          <Link to="/">
            <Li onClick={() => setShowMenu(false)}>
              <div>HOME</div> <BiChevronRight />
            </Li>
          </Link>
          <Link to="/gallery">
            <Li onClick={() => setShowMenu(false)}>
              <div>GALLARY </div>
              <BiChevronRight />
            </Li>
          </Link>
          <Link to="/catalogue">
            <Li onClick={() => setShowMenu(false)}>
              <div>CATALOGUE</div>
              <BiChevronRight />
            </Li>
          </Link>
          <Link to="/casual">
            <Li onClick={() => setShowMenu(false)}>
              <div>CASUAL</div> <BiChevronRight />
            </Li>
          </Link>
          <Link to="/corperate">
            <Li onClick={() => setShowMenu(false)}>
              <div>COROPERATE</div> <BiChevronRight />
            </Li>
          </Link>
          <Link to="/owambe">
            <Li onClick={() => setShowMenu(false)}>
              <div>OWAMBE</div> <BiChevronRight />
            </Li>
          </Link>
          <Link to="/accesories">
            <Li onClick={() => setShowMenu(false)}>
              <div>ACCESORIES</div> <BiChevronRight />
            </Li>
          </Link>
        </MenuCont>
      )}
    </Container>
  );
}
