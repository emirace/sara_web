import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { Store } from "../Store";

const Container = styled.div`
  padding: 5vw;
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 3;
`;
const Right = styled.div`
  flex: 1;
  background: ${color.border};
  padding: 30px;
`;
const Item = styled.div`
  margin: 30px;
  display: flex;
  align-items: center;
`;
const ImageCont = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
`;
const Details = styled.div`
  flex: 2;
`;
const Name = styled.div`
  font-weight: 500;
  font-size: 18px;
  text-transform: capitalize;
`;
const Detail = styled.div``;
const Price = styled.div`
  flex: 1;
  font-size: 18px;
`;
const Close = styled.div`
  flex: 1;
  & svg {
    font-size: 20px;
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
  margin: 10px 0;
`;
const SumKey = styled.div`
  flex: 2;
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
const Input = styled.input`
  background: none;
  border: 1px solid black;
  padding: 8px;
  &:focus-visible {
    outline: none;
    border-color: ${color.main};
  }
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
export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const removeItem = (product) => {
    ctxDispatch({ type: "REMOVE_CART_ITEM", payload: product });
  };
  return (
    <Container>
      <h1>Shopping Cart</h1>
      <Content>
        <Left>
          {console.log(cart)}
          {cart.map((cartItem) => (
            <Item key={cartItem._id}>
              <ImageCont>
                <Image src={`/images/${cartItem.src}`} alt="img" />
              </ImageCont>
              <Details>
                <Name>{cartItem.name}</Name>
                <Detail>desscription</Detail>
              </Details>
              <Price>${cartItem.price}</Price>
              <Close onClick={() => removeItem(cartItem)}>
                <AiOutlineClose />
              </Close>
            </Item>
          ))}
        </Left>
        <Right>
          <SubHeading>Summary</SubHeading>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <SumCont>
                <SumItem>
                  <SumKey>Subtotal</SumKey>
                  <SumValue>${cart.reduce((a, c) => a + c.price, 0)}</SumValue>
                </SumItem>

                <SumItem>
                  <SumKey>Shipping</SumKey>
                  <SumValue>$99</SumValue>
                </SumItem>

                <SumItem>
                  <SumKey>Tax</SumKey>
                  <SumValue>$99</SumValue>
                </SumItem>
              </SumCont>
              <Promo>
                <SumKey>Promocode</SumKey>
                <SumValue>
                  <Input type="text" placeholder="enter code" />
                </SumValue>
              </Promo>
            </div>
            <CheckOutCont>
              <TotalCont>
                <Total>Total</Total>
                <Value>$99</Value>
              </TotalCont>
              <CheckOutButton>Checkout</CheckOutButton>
            </CheckOutCont>
          </div>
        </Right>
      </Content>
    </Container>
  );
}
