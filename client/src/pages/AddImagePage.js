import React, { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";

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

export default function AddImagePage() {
  const { type } = useParams();
  const [image, setImage] = useState("");

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
          onChange={(e) => setImage(e.target.files)}
        />

        <Submit>Upload</Submit>
      </Section>
    </Container>
  );
}
