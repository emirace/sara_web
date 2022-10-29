import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingBox from "../component/LoadingBox";
import { color } from "../constant/parameters";
import { Store } from "../Store";

const Container = styled.div`
  padding: 5vw;
`;
const Title = styled.h1``;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${color.background2};
  padding: 1vw 5vw;
  margin-bottom: 20px;
`;

const Upload = styled.label`
  width: 250px;
  height: 500px;
  border: 1px dashed ${color.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.2rem;
  justify-content: center;
  & svg {
    font-size: 60px;
  }
`;
const Image = styled.img`
  margin-right: 10px;
  width: 250px;
  height: 500px;
  object-fit: cover;
`;

const Submit = styled.div`
  margin: 15px;
  background: ${color.main};
  color: white;
  padding: 10px 7px;
  width: 200px;
  text-align: center;
  border-radius: 0.2rem;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: black;
  }
`;
const Label = styled.div`
  margin-right: 10px;
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

const Row = styled.div`
  margin: 10px 0;
`;

const ImageRow = styled.div`
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export default function AddImagePage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const { type } = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState(false);
  const uploadImage = async (e) => {
    setLoadingImage(true);
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (!image) {
        setImage(data.secure_url);
      } else {
        setImages((prev) => [...prev, data.secure_url]);
      }
      setLoadingImage(false);
    } catch (err) {
      setLoadingImage(false);
    }
  };

  const submit = async () => {
    console.log(type);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/${type === "gallery" ? "galleries" : "catalogues"}`,
        {
          name,
          image,
          images,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      setLoading(false);
      navigate(`/${type}`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Container>
      <Title>
        Add Image to <span style={{ textTransform: "capitalize" }}>{type}</span>
      </Title>
      <Section>
        <ImageRow style={{ display: "flex" }}>
          {console.log(image, ...images)}
          {[image, ...images].map((img) => {
            if (img) {
              return <Image src={img} alt="img" />;
            }
          })}
          {loadingImage ? (
            <LoadingBox />
          ) : (
            <Upload htmlFor="uploadstyle">
              <AiOutlinePicture />
              <div>Add photo</div>
            </Upload>
          )}
          <input
            style={{ display: "none" }}
            type="file"
            id="uploadstyle"
            onChange={(e) => uploadImage(e)}
          />
        </ImageRow>
        <Row>
          <Label>Product Name</Label>
          <div style={{ width: "100%" }}>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
        </Row>

        <Submit onClick={submit}>
          {loading ? (
            <LoadingBox comn="inline" type="bubbles" height={20} width={20} />
          ) : (
            "UPload"
          )}
        </Submit>
      </Section>
    </Container>
  );
}
