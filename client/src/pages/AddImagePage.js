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
const Image = styled.img``;

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

  const uploadImage = (file) => {
    const data = "image.jpg";
    console.log(file);
    if (!image) {
      setImage(data);
    } else {
      setImages((prev) => [...prev, data]);
    }
    console.log("image", image, "images", images);
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
      navigate("/gallery");
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
        <Image src={image} alt="" />
        <Upload htmlFor="uploadstyle">
          <AiOutlinePicture />
          <div>Add photo</div>
        </Upload>
        <input
          style={{ display: "none" }}
          type="file"
          id="uploadstyle"
          onChange={(e) => uploadImage(e.target.files)}
        />
        <Row>
          <Label>Product Name</Label>
          <div style={{ width: "100%" }}>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
        </Row>

        <Submit onClick={submit}>{loading && <LoadingBox />} Upload</Submit>
      </Section>
    </Container>
  );
}
