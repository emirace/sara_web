import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import Select from "react-select";
import styled from "styled-components";
import { color, colorStyles } from "../constant/parameters";
import axios from "axios";
import { Store } from "../Store";
import LoadingBox from "../component/LoadingBox";
import { useNavigate, useParams } from "react-router-dom";
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
const ImageCont = styled.div`
  width: 150px;
  height: 259px;
  margin: 15px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Close = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: ${color.border};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -16px;
  right: -16px;
  cursor: pointer;
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
  { value: "Bags", label: "Bags" },
];
const sizes = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const currency1 = [
  { value: "EUR", label: "EUR" },
  { value: "USD", label: "USD" },
];
const type = [
  { value: "Flat", label: "Flat" },
  { value: "Percent", label: "Percent" },
];
export default function EditProductPage() {
  const { state } = useContext(Store);
  const { userInfo, mode } = state;
  const { slug } = useParams();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState("");

  const [input, setInput] = useState({ discount: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      setLoadingEdit(true);
      try {
        const { data } = await axios.get(`/api/products/product/${slug}`);
        if (data.success) {
          setLoadingEdit(false);
          setInput({
            ...data.product,
            currency: {
              value: data.product.currency,
              label: data.product.currency,
            },
          });
        } else {
          setLoadingEdit(false);
          setError(data.message);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoadingEdit(false);
      }
    };
    getProduct();
  }, [slug]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `/api/products/${input._id}`,
        {
          image: input.image,
          category: input.category,
          name: input.name,
          images,
          material: input.material,
          size: input.size,
          price: input.price,
          discount: input.discount,
          currency: input.currency.value,
          isNigeria: input.isNigeria,
          countInStock: input.countInStock,
          description: input.description,
          detail: input.detail,
          deliveryTime: input.deliveryTime,
          priceNigeria: input.priceNigeria,
          slider: input.slider,
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
      handleError(err.message, "sumbit");
    }
  };

  const validate = () => {
    var valid = true;
    if (!input.image) {
      handleError("Please add an image", "image");
      valid = false;
    }
    if (!input.category) {
      handleError("Please select a category", "category");
      valid = false;
    }
    if (!input.price) {
      handleError("Please add price", "price");
      valid = false;
    }
    if (!input.name) {
      handleError("Please add a product name", "name");
      valid = false;
    }
    if (!input.currency) {
      handleError("Please select currency", "currency");
      valid = false;
    }
    if (!input.countInStock) {
      handleError("Please add number of item in stock", "countInStock");
      valid = false;
    }

    if (!input.description) {
      handleError("Please add description", "description");
      valid = false;
    }
    if (!input.size) {
      handleError("Please select size", "size");
      valid = false;
    }
    if (input.isNigeria && !input.priceNigeria) {
      handleError("Please enter price in Nigeria currency", "priceNigeria");
      valid = false;
    }

    if (valid) {
      handleSubmit();
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
      if (!input.image) {
        handleOnChange(data.secure_url, "image");
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

  const handleOnChange = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
    handleError("", input);
  };
  const handleError = (errorMessage, input) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const removeImage = (img, index) => {
    console.log(img, index);
    if (index === 0) {
      console.log("hello");
      handleOnChange("", "image");
    } else {
      console.log("hello2");

      setImages(images.filter((i) => i !== img));
    }
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
                {[input.image, ...images].map(
                  (img, index) =>
                    img && (
                      <ImageCont>
                        <Image src={img} alt="" />
                        <Close onClick={() => removeImage(img, index)}>
                          <AiOutlineClose />
                        </Close>
                      </ImageCont>
                    )
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
            {error.image && <div style={{ color: "red" }}> {error.image}</div>}
          </Section>
          <Section>
            <SubHeading>Product Information</SubHeading>
            <Content>
              <Row>
                <Label>Select Category</Label>
                <div style={{ width: "100%" }}>
                  <Select
                    options={categories}
                    isMulti
                    value={input.category}
                    styles={colorStyles}
                    onChange={(e) => handleOnChange(e, "category")}
                  />
                </div>
              </Row>
              {error.category && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.category}
                </div>
              )}

              <Row>
                <Label>Product Name</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    type="text"
                    value={input.name}
                    onChange={(e) => handleOnChange(e.target.value, "name")}
                  />
                </div>
              </Row>
              {error.name && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.name}
                </div>
              )}

              <Row>
                <Label>Material</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    value={input.material}
                    type="text"
                    onChange={(e) => handleOnChange(e.target.value, "material")}
                  />
                </div>
              </Row>
              {error.material && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.material}
                </div>
              )}
              <Row>
                <Label>Available Size</Label>
                <div style={{ width: "100%" }}>
                  <Select
                    options={sizes}
                    isMulti
                    styles={colorStyles}
                    onChange={(e) => handleOnChange(e, "size")}
                  />
                </div>
              </Row>
              {error.size && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.size}
                </div>
              )}
            </Content>
          </Section>
          <Section>
            <SubHeading>Price</SubHeading>
            <Content>
              <Row>
                <Label>Price</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    value={input.price}
                    type="number"
                    onChange={(e) => handleOnChange(e.target.value, "price")}
                  />
                </div>
              </Row>
              {error.price && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.price}
                </div>
              )}
              {console.log(input)}
              <Row>
                <Label>Currency</Label>
                <div style={{ width: "100%" }}>
                  <Select
                    options={currency1}
                    value={input.currency}
                    styles={colorStyles}
                    onChange={(e) => handleOnChange(e, "currency")}
                  />
                </div>
              </Row>
              {error.currency && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.currency}
                </div>
              )}

              <Row>
                <Label>Product is Available in Nigeria</Label>
                <Checkbox
                  mode={mode}
                  checked={input.isNigeria}
                  type="checkbox"
                  onChange={(e) =>
                    handleOnChange(e.target.checked, "isNigeria")
                  }
                />
              </Row>
              {input.isNigeria && (
                <Row>
                  <Label>Price for Nigeria</Label>
                  <div style={{ width: "100%" }}>
                    <Input
                      type="number"
                      value={input.priceNigeria}
                      onChange={(e) =>
                        handleOnChange(e.target.value, "priceNigeria")
                      }
                    />
                  </div>
                </Row>
              )}
              {error.priceNigeria && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.priceNigeria}
                </div>
              )}

              <Row>
                <Label>Discount(%)</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    value={input.discount}
                    type="number"
                    onChange={(e) => handleOnChange(e.target.value, "discount")}
                  />
                </div>
              </Row>

              <Row>
                <Label>Quantity in Stock</Label>
                <div style={{ width: "100%" }}>
                  <Input
                    type="number"
                    value={input.countInStock}
                    onChange={(e) =>
                      handleOnChange(e.target.value, "countInStock")
                    }
                  />
                </div>
              </Row>
              {error.countInStock && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.countInStock}
                </div>
              )}
            </Content>
          </Section>
          <Section>
            <SubHeading>Product Description</SubHeading>
            <Content>
              <Row>
                <Label>Description</Label>
                <div style={{ width: "100%" }}>
                  <Textarea
                    onChange={(e) =>
                      handleOnChange(e.target.value, "description")
                    }
                  >
                    {input.description}
                  </Textarea>
                </div>
              </Row>
              {error.description && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.description}
                </div>
              )}
              <Row>
                <Label>Details and Fit</Label>
                <div style={{ width: "100%" }}>
                  <Textarea
                    onChange={(e) => handleOnChange(e.target.value, "detail")}
                  ></Textarea>
                </div>
              </Row>
              {error.detail && (
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {" "}
                  {error.detail}
                </div>
              )}
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
                    value={input.deliveryTime}
                    onChange={(e) =>
                      handleOnChange(e.target.value, "deliveryTime")
                    }
                  />
                </div>
              </Row>
            </Content>
          </Section>
          <Section>
            <Content>
              <Row>
                <Label>Show product on slider</Label>
                <Checkbox
                  mode={mode}
                  checked={input.slider}
                  type="checkbox"
                  onChange={(e) => handleOnChange(e.target.checked, "slider")}
                />
              </Row>
            </Content>
          </Section>
        </Right>
      </Wrapper>
      {error.submit && <div style={{ color: "red" }}> {error.submit}</div>}
      <Submit onClick={validate}>
        {loading ? (
          <LoadingBox comn="inline" type="bubbles" height={20} width={20} />
        ) : (
          "Save"
        )}
      </Submit>
    </Container>
  );
}
