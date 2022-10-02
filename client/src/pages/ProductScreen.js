import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import { products } from "../utils/data";

const Container = styled.div`
  padding: 0 5vw;
  @media (max-width: 500px) {
    padding: 0 2vw;
  }
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Col = styled.div`
  flex: 1;
  padding: 20px;
  @media (max-width: 500px) {
    padding: 10px;
  }
`;
const Col1 = styled.div`
  flex: 1;
  padding: 30px;
  @media (max-width: 500px) {
    padding: 15px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;
  @media (max-width: 500px) {
    height: 500px;
  }
`;
const Name = styled.div`
  text-transform: uppercase;
  font-size: 50px;
`;
const Icons = styled.div``;
const SizeCont = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
`;
const SizeKey = styled.div`
  font-weight: 500;
  margin-right: 20px;
`;
const SizeValue = styled.div`
  margin: 0 20px;
  font-weight: bold;
  &:hover {
    color: ${color.main};
  }
`;

const CheckOutButton = styled.div`
  background: ${color.main};
  color: white;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  padding: 8px;
  margin-bottom: 30px;

  &:hover {
    color: black;
  }
`;

const Price = styled.div`
  color: ${color.main};
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function ProductScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { id } = useParams();

  const [{ product, loading }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
  });
  useEffect(() => {
    const getProduct = () => {
      console.log(id);
      dispatch({ type: "FETCH_REQUEST" });
      try {
        products.map((p) => {
          if (p._id.toString() === id) {
            dispatch({ type: "FETCH_SUCCESS", payload: p });
            console.log(p);
          }
        });
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL" });
      }
    };
    getProduct();
  }, [id]);

  const addToCart = (product) => {
    ctxDispatch({ type: "ADD_TO_CART", payload: product });
  };

  return loading ? (
    "Loading"
  ) : (
    <Container>
      <Content>
        <Col>
          <Image src={`/images/${product.src}`} alt="img" />
        </Col>
        <Col1>
          <Name>{product.name}</Name>
          <Price>${product.price}</Price>

          <Description>Description</Description>
          <p>{product.description}</p>
          <Icons></Icons>
          <SizeCont>
            <SizeValue>XM</SizeValue>
            <SizeValue>S</SizeValue>
            <SizeValue>M</SizeValue>
            <SizeValue>L</SizeValue>
            <SizeValue>XL</SizeValue>
          </SizeCont>
          <CheckOutButton onClick={() => addToCart(product)}>
            ADD TO CART
          </CheckOutButton>
          <div style={{ width: "70%" }}>
            <Description>Materials:</Description>
            <p style={{ marginTop: "5px" }}>
              eget. Mauris nibh augue, mattis vel condimentum in, tincidunt ac
              velit. Morbi aliquet nisl in nisl posuere, eget euismod nulla
              lobortis. Nunc
            </p>
            <Description>Deatails and fit:</Description>
            <ul style={{ marginTop: "5px" }}>
              <li>green col1Col1or</li>
              <li>green color</li>
              <li>green color</li>
              <li>green color</li>
            </ul>
          </div>
        </Col1>
      </Content>
    </Container>
  );
}
