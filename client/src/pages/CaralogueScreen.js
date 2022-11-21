import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";

const Container = styled.div`
  padding: 0 5vw;
  @media (max-width: 500px) {
    padding: 0 2vw;
  }
`;

const Name = styled.div`
  text-transform: uppercase;
  font-size: 30px;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 50%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, catalogue: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function CatalogueScreen() {
  const { id } = useParams();

  const [{ catalogue, loading, error }, dispatch] = useReducer(reducer, {
    catalogue: {},
    loading: true,
    error: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/catalogues/${id}`);
        if (data.success) {
          dispatch({ type: "FETCH_SUCCESS", payload: data.catalogue });
          console.log(data);
        } else {
          dispatch({ type: "FETCH_FAIL", payload: data.message });
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    getProduct();
  }, [id]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <Container>
      <Name>{catalogue.name}</Name>
      <Content>
        {[catalogue.image, ...catalogue.images].map((image) => (
          <Image src={`${image}`} alt="img" />
        ))}
      </Content>
      <p>{catalogue.description}</p>
    </Container>
  );
}
