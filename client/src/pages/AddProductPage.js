import React, { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import Select from "react-select";
import styled from "styled-components";
import { color, colorStyles } from "../constant/parameters";

const Container = styled.div`
  padding: 5vw;
`;
const Title = styled.h1``;
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 3;
`;
const Right = styled.div`
  flex: 1;
`;
const Section = styled.div`
  background: ${color.background2};
  padding: 1vw 5vw;
  margin-bottom: 20px;
`;
const SubHeading = styled.h2`
  font-weight: 500;
`;
const Content = styled.div``;
const Upload = styled.label`
  width: 150px;
  height: 150px;
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
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
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

const Submit = styled.div`
  margin: 15px;
  background: ${color.main};
  color: white;
  padding: 10px 7px;
  width: 150px;
  text-align: center;
  border-radius: 0.2rem;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: black;
  }
`;

const categories = [
  { value: "Owambe", label: "Owambe" },
  { value: "Casual", label: "Casual" },
];
const type = [
  { value: "Flat", label: "Flat" },
  { value: "Percent", label: "Percent" },
];
export default function AddProductPage() {
  const [image, setImage] = useState("");
  return (
    <Container>
      <Title>ADD PRODUCT</Title>
      <Wrapper>
        <Left>
          <Section>
            <SubHeading>Add Image</SubHeading>
            <Content>
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
            </Content>
          </Section>
          <Section>
            <SubHeading>Product Information</SubHeading>
            <Content>
              <Row>
                <Label>Select Category</Label>
                <div style={{ width: "100%" }}>
                  <Select options={categories} styles={colorStyles} />
                </div>
              </Row>
              <Row>
                <Label>Product Name</Label>
                <div style={{ width: "100%" }}>
                  <Input type="text" />
                </div>
              </Row>
              <Row>
                <Label>Material</Label>
                <div style={{ width: "100%" }}>
                  <Input type="text" />
                </div>
              </Row>
            </Content>
          </Section>
          <Section>
            <SubHeading>Price</SubHeading>
            <Content>
              <Row>
                <Label>Price</Label>
                <div style={{ width: "100%" }}>
                  <Input type="number" />
                </div>
              </Row>

              <Row>
                <Label>Discount(%)</Label>
                <div style={{ width: "100%" }}>
                  <Input type="number" />
                </div>
              </Row>

              <Row>
                <Label>QTY</Label>
                <div style={{ width: "100%" }}>
                  <Input type="number" />
                </div>
              </Row>
            </Content>
          </Section>
          <Section>
            <SubHeading>Product Description</SubHeading>
            <Content>
              <Row>
                <Label>Description</Label>
                <div style={{ width: "100%" }}>
                  <Textarea></Textarea>
                </div>
              </Row>
            </Content>
          </Section>
        </Left>
        <Right>
          <Section>
            <SubHeading>Estimated Delivery Time</SubHeading>
            <Content>
              <Row>
                <Label>Days</Label>
                <div style={{ width: "100%" }}>
                  <Input type="number" />
                </div>
              </Row>
            </Content>
          </Section>

          <Section>
            <SubHeading>TAX & VAT</SubHeading>
            <Content>
              <Row>
                <Label>VAT</Label>
                <div style={{ width: "100%" }}>
                  <Input type="number" />
                </div>
              </Row>
              <Select options={type} styles={colorStyles} />
            </Content>
          </Section>
        </Right>
      </Wrapper>
      <Submit>Save</Submit>
    </Container>
  );
}
