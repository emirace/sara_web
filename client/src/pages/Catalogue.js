import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { color } from "../constant/parameters";
import Model from "../component/Model";
import { Store } from "../Store";
import axios from "axios";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";

const Container = styled.div`
  padding: 5vw;
`;
const Content = styled.div`
  -webkit-column-count: 4;
  -moz-column-count: 4;
  column-count: 4;
  -webkit-column-width: 25%;
  -moz-column-width: 25%;
  column-width: 25%;
  padding: 0 12px;
  @media (max-width: 991px) {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
  @media (max-width: 480px) {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const ImageCont = styled.div`
  position: relative;
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  cursor: pointer;
  margin-bottom: 12px;
  border: 1px solid ${color.main};
`;
const H1 = styled.h1`
  text-align: center;
`;
const ButtonCont = styled.div`
  display: flex;
`;
const IconCont = styled.div`
  border: 1px solid #fff;
  margin: 0 5px 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  cursor: pointer;
  & svg {
    font-size: 20px;
    color: white;
  }
  &:hover {
    background: white;
  }
  &:hover svg {
    color: ${color.main};
  }
`;
const Request = styled.div`
  /* position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%); */
  background: ${color.main};
  color: #fff;
  margin: 0 5px 3px 5px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: ${color.main};
  }
`;
const ModelImgCont = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
  align-items: center;
`;
const ModelImg = styled.img``;

const images = [
  { key: 1, src: "cat1.webp" },
  { key: 2, src: "cat2.jpg" },
  { key: 3, src: "cat3.jpg" },
  { key: 4, src: "cat4.jpg" },
  { key: 5, src: "cat5.jpg" },
  { key: 6, src: "cat6.jpg" },
  { key: 7, src: "cat7.jfif" },
  { key: 8, src: "cat8.jfif" },
  { key: 9, src: "cat9.webp" },
  { key: 10, src: "cat10.png" },
  { key: 11, src: "cat11.jpg" },
  { key: 12, src: "cat12.webp" },
];

export default function Catalogue() {
  const { dispatch: ctxDispatch } = useContext(Store);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [catalogues, setCatalogues] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const getCatalogues = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/catalogues/");
        console.log(data);
        setCatalogues(data.catalogues);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getCatalogues();
  }, []);
  const bookoutfit = (image) => {
    ctxDispatch({
      type: "ADD_STYLE",
      payload: { ...image, styleType: "catalogue" },
    });
    navigate("/bookorder");
  };
  const [zoomImg, setZoomImg] = useState("");
  const handleZoom = (img) => {
    setShowModel(true);
    setZoomImg(img);
  };
  return (
    <Container>
      <H1>CATALOGUE</H1>
      <Content>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div>{error}</div>
        ) : !catalogues.length ? (
          <MessageBox>No Image Found</MessageBox>
        ) : (
          catalogues.map((x) => (
            <ImageCont key={x.key}>
              <Image src={x.image} alt="img" />
              <ButtonCont>
                <IconCont onClick={() => handleZoom(x.image)}>
                  <IoSearchOutline />
                </IconCont>
                <Request onClick={() => bookoutfit(x)}>BOOK OUTFIT</Request>
              </ButtonCont>
            </ImageCont>
          ))
        )}
        <Model showModel={showModel} setShowModel={setShowModel}>
          <ModelImgCont>
            <ModelImg src={zoomImg} alt="img" />
          </ModelImgCont>
        </Model>
      </Content>
    </Container>
  );
}
