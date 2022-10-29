import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { color } from "../constant/parameters";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  position: relative;
  width: 60vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border: 1px solid ${color.background2};
`;
const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px;
`;
const Top = styled.div`
  flex: 6;
  background: ${color.background2};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & svg {
    font-size: 50px;
    margin: 30px;
  }
`;
const Buttom = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.div`
  cursor: pointer;
  padding: 5px 7px;
  background: ${color.main};
  text-align: center;
`;
const Text = styled.div`
  font-weight: bold;
`;
export default function OrderSuccessPage() {
  const { id: orderId, type } = useParams();
  const navigate = useNavigate();

  const handle = () => {
    navigate(`/${type}/${orderId}`);
  };
  return (
    <Container>
      <Content>
        <Close>
          <AiOutlineClose />
        </Close>
        <Top>
          <BsCheck2Circle />
          <Text>Order Created Successfully</Text>
        </Top>
        <Buttom>
          <Button onClick={handle}>View Order Details</Button>
        </Buttom>
      </Content>
    </Container>
  );
}
