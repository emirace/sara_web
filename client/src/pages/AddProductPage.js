import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import Select from "react-select";
import styled from "styled-components";
import { color, colorStyles } from "../constant/parameters";
import axios from "axios";
import { Store } from "../Store";
import LoadingBox from "../component/LoadingBox";
import { useNavigate } from "react-router-dom";
import { resizeImage } from "../component/ResizeImage";

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
const Image = styled.img`
  width: 150px;
  height: 259px;
  margin: 15px;
  object-fit: cover;
`;
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
  display: flex;
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

const Checkbox = styled.input`
  margin-bottom: 10px;
  margin-right: 10px;
  &::after {
    width: 15px;
    height: 15px;
    content: "";
    display: inline-block;
    visibility: visible;
    position: relative;
    top: -2px;
    left: -1px;
    background-color: ${(props) =>
      props.mode === "darkmode" ? "black" : "white"};
    border: 1px solid ${color.main};
  }
  &:checked::after {
    width: 15px;
    height: 15px;
    content: "";
    display: inline-block;
    visibility: visible;
    position: relative;
    top: -2px;
    left: -1px;
    background-color: ${color.main};
    border: 1px solid ${color.main};
  }
`;

const categories = [
  { value: "Owambe", label: "Owambe" },
  { value: "Casual", label: "Casual" },
  { value: "Corporate", label: "Corporate" },
  { value: "Accesories", label: "Accesories" },
];

const currency1 = [
  { value: "EUR", label: "EUR" },
  { value: "USD", label: "USD" },
];
const type = [
  { value: "Flat", label: "Flat" },
  { value: "Percent", label: "Percent" },
];
export default function AddProductPage() {
  const { state } = useContext(Store);
  const { userInfo, mode } = state;

  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [currency, setCurrency] = useState("");
  const [isNigeria, setIsNigeria] = useState(false);
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [priceNigeria, setPriceNigeria] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("category", category);
      await axios.post(
        "/api/products",
        {
          image,
          category,
          name,
          images,
          material,
          price,
          discount,
          currency,
          isNigeria,
          countInStock,
          description,
          deliveryTime,
          priceNigeria,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.message);
    }
  };
  const [loadingImage, setLoadingImage] = useState(false);
  const uploadImage = async (e) => {
    setLoadingImage(true);
    const file = e;

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
  const [invalidImage, setInvalidImage] = useState("");
  const [resizeImage1, setResizeImage] = useState({
    file: [],
    filepreview: null,
  });
  useEffect(() => {
    const uploadImage1 = () => {
      console.log("file", invalidImage, resizeImage1);
      if (!invalidImage && resizeImage1.filepreview) {
        uploadImage(resizeImage1.file);
      }
    };
    uploadImage1();
  }, [resizeImage1]);
  const handleResize = (e) => {
    resizeImage(e, setInvalidImage, setResizeImage);
  };

  return (
    <Container>
      <Title>ADD PRODUCT</Title>
      <Wrapper>
        <Left>
          <Section>
            <SubHeading>Add Image</SubHeading>
            <Content>
              <div style={{ display: "flex", alignItems: "center" }}>
                {[image, ...images].map(
                  (img) => img && <Image src={img} alt="" />
                )}
                {loadingImage ? (
                  <LoadingBox />
                ) : (
                  <Upload htmlFor="uploadstyle">
                    <AiOutlinePicture />
                    <div>Add photo</div>
                    {invalidImage && (
                      <div style={{ color: "red" }}>{invalidImage}</div>
                    )}
                  </Upload>
                )}
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                id="uploadstyle"
                onChange={(e) => handleResize(e)}
              />
            </Content>
          </Section>
          <Section>
            <SubHeading>Product Information</SubHeading>
            <Content>
              <Row>
                <Label>Select Category</Label>
                <div style={{ width: "100%" }}>
                  <Select
                    options={categories}
                    styles={colorStyles}
                    onChange={(e) => setCategory(e.value)}
                  />
                </div>
              </Row>
              <Row>
                <Label>Product Name</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Row>
              <Row>
                <Label>Material</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    type="text"
                    onChange={(e) => setMaterial(e.target.value)}
                  />
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
                  <Input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </Row>
              <Row>
                <Label>Currency</Label>
                <div style={{ width: "100%" }}>
                  <Select
                    options={currency1}
                    styles={colorStyles}
                    onChange={(e) => setCurrency(e.value)}
                  />
                </div>
              </Row>
              <Row>
                <Label>Product is Available in Nigeria</Label>
                <Checkbox
                  mode={mode}
                  type="checkbox"
                  onChange={(e) => setIsNigeria(e.target.checked)}
                />
              </Row>
              {isNigeria && (
                <Row>
                  <Label>Price for Nigeria</Label>
                  <div style={{ width: "100%" }}>
                    <Input
                      type="number"
                      onChange={(e) => setPriceNigeria(e.target.value)}
                    />
                  </div>
                </Row>
              )}
              <Row>
                <Label>Discount(%)</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    type="number"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </Row>

              <Row>
                <Label>Quantity in Stock</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    type="number"
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
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
                  <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                  ></Textarea>
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
                  <Input
                    type="number"
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>
              </Row>
            </Content>
          </Section>
        </Right>
      </Wrapper>
      {error && <div style={{ color: "red" }}> {error}</div>}
      <Submit onClick={handleSubmit}>
        {loading ? (
          <LoadingBox comn="inline" type="bubbles" height={20} width={20} />
        ) : (
          "Save"
        )}
      </Submit>
    </Container>
  );
}
