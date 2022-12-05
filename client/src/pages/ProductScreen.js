import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingBox from "../component/LoadingBox";
import SliderMobile from "../component/SliderMobile";
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
  flex: 3;
  padding: 20px;
  @media (max-width: 500px) {
    padding: 10px;
    &.desktop {
      display: none;
    }
  }
`;
const Col1 = styled.div`
  flex: 3;
  padding: 30px;
  @media (max-width: 500px) {
    padding: 15px;
  }
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  @media (max-width: 500px) {
    height: 500px;
    display: none;
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
  align-items: center;
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
  cursor: pointer;
  &:hover {
    color: ${color.main};
  }
  @media (max-width: 992px) {
    margin: 0 10px;
    width: 16px;
    height: 16px;
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
  @media (max-width: 992px) {
    margin: 0 20px 20px;
  }
`;
const Cat = styled.div`
  border: 1px solid ${color.main};
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: ${color.main};
`;
const SmallImg = styled.img`
  width: 100px;
  margin-bottom: 20px;
  cursor: pointer;
  &.active {
    border: 1px solid ${color.main};
  }
`;
const ImgCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
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
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/products/product/${slug}`);
        if (data.success) {
          dispatch({ type: "FETCH_SUCCESS", payload: data.product });
          console.log(data);
          setSelectedImage(data.product.image);
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
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const addToCart = (product) => {
    setSizeError("");
    if (!selectedSize) {
      setSizeError("Please select size");
      return;
    }
    ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, selectedSize } });
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container>
      <Content>
        <Col className="desktop" style={{ flex: 1 }}>
          {" "}
          <ImgCont>
            {console.log(selectedImage)}
            {[product.image, ...product.images].map((img) => (
              <SmallImg
                onClick={() => setSelectedImage(img)}
                key={img}
                src={img}
                className={selectedImage === img ? "active" : ""}
              />
            ))}{" "}
          </ImgCont>
        </Col>
        <Col>
          <Image src={selectedImage} alt="img" />
          <SliderMobile images={[product.image, ...product.images]} />
        </Col>
        <Col>
          <Name>{product.name}</Name>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Price>
              {location === "NG" ? "NGN" : "EUR"}
              {discountPrice(product, location)}
            </Price>
            {product.discount && (
              <Discount>
                {location === "NG" ? "NGN" : "EUR"}
                {location === "NG"
                  ? product.priceNigeria.toFixed(2)
                  : product.price.toFixed(2)}
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
            {product.size.map((s) => (
              <SizeValue onClick={() => setSelectedSize(s.value)}>
                {s.value}
              </SizeValue>
            ))}
          </SizeCont>
          {sizeError && <div style={{ color: "red" }}> {sizeError}</div>}
          <CheckOutButton onClick={() => addToCart(product)}>
            ADD TO CART
          </CheckOutButton>

          <Description>Materials</Description>
          <p style={{ marginTop: "5px" }}>{product.material}</p>
          <Description>Category</Description>
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
            <Description>Details and fit:</Description>
            <p>{product.detail}</p>
          </div>
        </Col>
      </Content>
    </Container>
  );
}
