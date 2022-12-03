import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingBox from "../component/LoadingBox";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import { discountPrice } from "../utils/utils";

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
  border: 1px solid;
  padding: 8px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Discount = styled.div`
  font-size: 25px;
  color: grey;
  text-decoration: line-through;
  margin: 0 30px;
  margin-bottom: 20px;
`;
const Cat = styled.div`
  border: 1px solid ${color.main};
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: ${color.main};
`;
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function ProductScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { location } = state;
  const { slug } = useParams();

  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: "",
  });
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/products/product/${slug}`);
        if (data.success) {
          dispatch({ type: "FETCH_SUCCESS", payload: data.product });
        } else {
          dispatch({ type: "FETCH_FAIL", payload: data.message });
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    getProduct();
  }, [slug]);

  const addToCart = (product) => {
    ctxDispatch({ type: "ADD_TO_CART", payload: product });
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container>
      <Content>
        <Col>
          <Image src={`${product.image}`} alt="img" />
        </Col>
        <Col1>
          <Name>{product.name}</Name>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Price>
              {location === "NG" ? "NGN" : "EUR"}
              {discountPrice(product, location)}
            </Price>
            {product.discount && (
              <Discount>
                {location === "NG" ? "NGN" : "EUR"}
                {location === "NG" ? product.priceNigeria : product.price}
              </Discount>
            )}
            {product.discount && (
              <div style={{ marginBottom: "20px" }}>({product.discount}%)</div>
            )}
          </div>

          <Description>Description</Description>
          <p>{product.description}</p>
          <Icons></Icons>
          <SizeCont>
            <div>Select Size:</div>
            {/* <SizeValue>XM</SizeValue>
            <SizeValue>S</SizeValue>
            <SizeValue>M</SizeValue>
            <SizeValue>L</SizeValue>
            <SizeValue>XL</SizeValue> */}
          </SizeCont>
          <CheckOutButton onClick={() => addToCart(product)}>
            ADD TO CART
          </CheckOutButton>

          <Description>Materials:</Description>
          <p style={{ marginTop: "5px" }}>{product.material}</p>
          <Description>Category:</Description>
          <p
            style={{
              marginTop: "5px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {product.category.map((cat) => (
              <Cat>{cat.value}</Cat>
            ))}
          </p>
          <div style={{ width: "70%" }}>
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
