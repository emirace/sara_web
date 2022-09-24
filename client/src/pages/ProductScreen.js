import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { products } from "../utils/data";

const Container = styled.div`
  padding: 0 5vw;
`;
const Content = styled.div`
  display: flex;
`;
const Col = styled.div`
  flex: 1;
  padding: 20px;
`;
const Image = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;
`;
const Name = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
`;
const Icons = styled.div``;

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

  return loading ? (
    "Loading"
  ) : (
    <Container>
      <Content>
        {console.log("product", product)}
        <Col>
          <Image src={`/images/${product.src}`} alt="img" />
        </Col>
        <Col>
          <Name>{product.name}</Name>
          <h4>Description</h4>

          <p>{product.description}</p>
          <Icons></Icons>
        </Col>
      </Content>
    </Container>
  );
}
