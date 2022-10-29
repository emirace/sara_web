import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import { getCartTotalPrice } from "../utils/utils";

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
  & a {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    margin: 30px 0;
  }
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
  margin-left: 10px;
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
  @media (max-width: 500px) {
    text-align: right;
  }
`;
const Close = styled.div`
  flex: 1;
  text-align: right;
  @media (max-width: 500px) {
    text-align: right;
  }
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

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
`;
export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, location } = state;
  const navigate = useNavigate();
  const removeItem = (product) => {
    ctxDispatch({ type: "REMOVE_CART_ITEM", payload: product });
  };

  const delivery = () => {
    navigate("/delivery");
  };
  return (
    <Container>
      <h1>Shopping Cart</h1>
      <Content>
        <Left>
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <Item key={cartItem._id}>
                <Link to={`/product/${cartItem.slug}`}>
                  <ImageCont>
                    <Image src={`${cartItem.image}`} alt="img" />
                  </ImageCont>
                </Link>
                <Details>
                  <Link to={`/product/${cartItem.slug}`}>
                    <Name>{cartItem.name}</Name>
                  </Link>
                  <Detail>desscription</Detail>
                </Details>
                <Price>
                  {location === "NG"
                    ? `NGN ${
                        (Number(100 - cartItem.discount) / 100) *
                        Number(cartItem.priceNigeria)
                      }`
                    : `${cartItem.currency}
              ${
                (Number(100 - cartItem.discount) / 100) * Number(cartItem.price)
              }`}
                </Price>
                <Close onClick={() => removeItem(cartItem)}>
                  <AiOutlineClose />
                </Close>
              </Item>
            ))
          ) : (
            <Empty>
              Cart is empty.{" "}
              <span style={{ color: color.main }}>
                <Link to="/allproduct"> Continue shopping</Link>
              </span>
            </Empty>
          )}
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
                  <SumValue>
                    {location === "NG" ? "NGN" : "EUR"}
                    {getCartTotalPrice(cart, location)}{" "}
                  </SumValue>
                </SumItem>

                {/* <SumItem>
                  <SumKey>Shipping</SumKey>
                  <SumValue>$0</SumValue>
                </SumItem>

                <SumItem>
                  <SumKey>Tax</SumKey>
                  <SumValue>$0</SumValue>
                </SumItem> */}
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
                <Value>
                  {location === "NG" ? "NGN" : "EUR"}
                  {getCartTotalPrice(cart, location)}{" "}
                </Value>
              </TotalCont>
              <CheckOutButton onClick={delivery}>Checkout</CheckOutButton>
            </CheckOutCont>
          </div>
        </Right>
      </Content>
    </Container>
  );
}
