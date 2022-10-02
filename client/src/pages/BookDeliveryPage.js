import React, { useContext, useState } from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { Store } from "../Store";

const Container = styled.div`
  padding: 5vw;
`;
const Heading = styled.h1`
  margin-top: 0;
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 4;
  padding: 0 20px;
`;
const Right = styled.div`
  padding: 30px;
  flex: 2;
`;
const Form = styled.div``;

const OptionCont = styled.div`
  margin: 30px 0;
`;
const Label = styled.div`
  margin-bottom: 10px;
  text-transform: capitalize;
`;
const Input = styled.input`
  width: 100%;
  height: 35px;
  background: none;
  border-radius: 0.2rem;
  padding: 0 5px;
  border: 1px solid ${color.border};
  color: white;
  &:focus-visible {
    outline: none;
    border: 1px solid ${color.main};
  }
`;

const SumCont = styled.div`
  margin: 30px 0;
`;

const SubHeading = styled.h2`
  margin: 0 0 20px 0;
`;
const SumItem = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
const SumKey = styled.div`
  flex: 2;
  font-size: 20px;
`;
const SumValue = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;
const Promo = styled.div`
  display: flex;
  align-items: center;
`;
const CheckOutCont = styled.div`
  margin-top: 50px;
`;
const TotalCont = styled.div`
  display: flex;
  font-size: 18px;
`;
const Total = styled.div`
  flex: 2;
`;
const Value = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;

const CheckOutButton = styled.div`
  width: 200px;
  background: ${color.main};
  color: white;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  margin-top: 30px;
  padding: 8px;
  &:hover {
    color: black;
  }
`;

export default function BookDeliveryPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [tab, setTab] = useState("info");

  const displayTab = (item) => {
    switch (item) {
      case "info":
        return (
          <div>
            <SubHeading>Who is placing this order?</SubHeading>
            <Form>
              <OptionCont>
                <Label>Email</Label>
                <Input type="text" />
              </OptionCont>
              <OptionCont>
                <Label>First Name</Label>
                <Input type="text" />
              </OptionCont>
              <OptionCont>
                <Label>Last Name</Label>
                <Input type="text" />
              </OptionCont>

              <OptionCont>
                <Label>Phone Number</Label>
                <Input type="number" />
              </OptionCont>

              <CheckOutButton onClick={() => setTab("delivery")}>
                Continue
              </CheckOutButton>
            </Form>
          </div>
        );
      case "delivery":
        return (
          <div>
            <SubHeading>Where would you like your order sent?</SubHeading>
            <Form>
              <OptionCont>
                <Label>Country</Label>
                <Input type="text" />
              </OptionCont>
              <OptionCont>
                <Label>Address</Label>
                <Input type="text" />
              </OptionCont>
              <OptionCont>
                <Label>City</Label>
                <Input type="text" />
              </OptionCont>

              <OptionCont>
                <Label>State/Region/Province</Label>
                <Input type="text" />
              </OptionCont>
              <OptionCont>
                <Label>Phone</Label>
                <Input type="number" />
              </OptionCont>

              <CheckOutButton onClick={() => setTab("payment")}>
                Continue
              </CheckOutButton>
            </Form>
          </div>
        );
      case "payment":
        return (
          <div>
            <SubHeading>Make Payment</SubHeading>
            <Form>
              <OptionCont>
                <Label>Account Number</Label>
              </OptionCont>

              <OptionCont>
                <Label>Account Name</Label>
              </OptionCont>
              <OptionCont>
                <Label>Bank Name</Label>
              </OptionCont>
              <CheckOutButton>Continue</CheckOutButton>
            </Form>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <Container>
      <Content>
        <Left>
          <Heading>Checkout</Heading>
        </Left>
        <Center>{displayTab(tab)}</Center>
        <Right></Right>
      </Content>
    </Container>
  );
}
