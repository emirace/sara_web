import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectBox from "../component/SelectBox";
import Select from "react-select";
import { AiOutlinePicture } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { color } from "../constant/parameters";

const Container = styled.div`
  padding: 30px 5vw;
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
const Col = styled.div`
  flex: 1;
  border: 1px solid ${color.border};
  border-radius: 0.2rem;
  margin: 5px;
  padding: 10px;
`;
const OptionCont = styled.div`
  margin: 30px;
`;
const Label = styled.div`
  margin-bottom: 10px;
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
const Chioce = styled.div`
  cursor: pointer;
  padding: 10px;
  margin: 15px 0;
  width: 100%;
  text-align: center;
  background: ${color.border};
  border-radius: 0.2rem;
`;
const Submit = styled.div`
  margin: 15px;
  margin-left: auto;
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

const Upload = styled.label`
  width: 150px;
  height: 150px;
  border: 1px dashed red;
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
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  width: 70%;
`;
const Radio = styled.div`
  display: flex;
  align-items: center;

  & input {
    width: auto;
    margin: 0;
    &::after {
      width: 15px;
      height: 15px;
      content: "";
      display: inline-block;
      visibility: visible;
      border-radius: 15px;
      position: relative;
      top: -2px;
      left: -1px;
      background-color: white;
      border: 1px solid ${color.main};
    }
    &:checked::after {
      width: 15px;
      height: 15px;
      content: "";
      display: inline-block;
      visibility: visible;
      border-radius: 15px;
      position: relative;
      top: -2px;
      left: -1px;
      background-color: ${color.main};
      border: 1px solid ${color.main};
    }
  }
  & label {
    margin: 0 10px;
    font-weight: 300;
  }
`;
const Row = styled.div`
  display: flex;
`;

const countries = [
  { value: "Austria", label: "Austria" },
  { value: "Belgium", label: "Belgium" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Germany", label: "Germany" },
  { value: "Denmark", label: "Denmark" },
  { value: "Estonia", label: "Estonia" },
  { value: "Spain", label: "Spain" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Greece", label: "Greece" },
  { value: "Hungary", label: "Hungary" },
  { value: "Croatia", label: "Croatia" },
  {
    value: "Ireland, Republic of (EIRE)",
    label: "Ireland, Republic of (EIRE)",
  },
  { value: "Italy", label: "Italy" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Latvia", label: "Latvia" },
  { value: "Malta", label: "Malta" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Romania", label: "Romania" },
  { value: "Sweden", label: "Sweden" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Slovakia", label: "Slovakia" },
];
const fabrics = [
  { value: "Provide Fabric", label: "Provide Fabric" },
  { value: "Buy Fabric from us", label: "Buy Fabric from us" },
];

const unit = [
  { value: "Inches", label: "Inches" },
  { value: "Meters", label: "Meters" },
];
const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export default function BookOrderScreen() {
  const search = useLocation().search;
  const style = new URLSearchParams(search).get("style");
  useEffect(() => {
    if (style) {
      setImage(`/images/${style}`);
    }
  }, [style]);

  const [styleType, setStyleType] = useState(false);
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState("");
  const [showMeasure, setShowMeasure] = useState(false);
  const navigate = useNavigate();
  const colorStyles = {
    control: (styles, { isFocused }) => {
      console.log("focus", isFocused);
      return {
        ...styles,
        backgroundColor: "#000",
        borderColor: isFocused ? "red" : color.border,
        boxShadow: "red",
        color: "white",
      };
    },
    menu: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? color.border : "black",
      color: "white",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? color.main
          : isFocused
          ? color.border
          : "black",
        color: isDisabled ? "#ccc" : isSelected ? "white" : "white",

        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "red"
              : color.border
            : undefined,
        },
      };
    },
  };
  return (
    <Container>
      <h1>Book an Order</h1>
      <Content>
        <Col>
          {!image ? (
            !styleType ? (
              <OptionCont
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  flex: "1",
                  height: "100%",
                }}
              >
                <Label>Select Style</Label>

                <Chioce onClick={() => navigate("/gallery")}>
                  Choose style from gallery
                </Chioce>

                <Chioce onClick={() => navigate("/catalogue")}>
                  Choose style from catalogue
                </Chioce>

                <Chioce onClick={() => setStyleType(true)}>
                  Upload image of your style
                </Chioce>
              </OptionCont>
            ) : (
              <OptionCont>
                <Upload htmlFor="uploadstyle">
                  <AiOutlinePicture />
                  <div>Add photo</div>
                </Upload>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="uploadstyle"
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files))
                  }
                />
              </OptionCont>
            )
          ) : (
            <ImageCont>
              <Image src={image} alt="/img" />
            </ImageCont>
          )}
          {console.log(image)}
        </Col>
        <Col>
          <OptionCont>
            <Label>Select Country</Label>
            <Select options={countries} styles={colorStyles} />
          </OptionCont>
          <OptionCont>
            <Label>Delivery adrress</Label>
            <Input type="text" />
          </OptionCont>
          <OptionCont>
            <Label>Fabric Chioce</Label>
            <Select options={fabrics} styles={colorStyles} />
          </OptionCont>
          <OptionCont>
            <Label>Select measurement unit</Label>
            <Select options={unit} styles={colorStyles} />
            <Chioce onClick={() => setShowMeasure(!showMeasure)}>
              Add measurement
            </Chioce>
          </OptionCont>
          {showMeasure && (
            <>
              <OptionCont>
                <Label>Select Gender</Label>
                <Radio>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={(e) => setSelected(e.target.value)}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={(e) => setSelected(e.target.value)}
                  />
                  <label htmlFor="male">Male</label>
                </Radio>
                {console.log(selected)}
              </OptionCont>
              {selected && (
                <>
                  <OptionCont style={{ display: "flex", alignItems: "center" }}>
                    <Label style={{ marginRight: "20px" }}>Shoulders</Label>
                    <Input type="number" />
                  </OptionCont>
                  <OptionCont style={{ display: "flex", alignItems: "center" }}>
                    <Label style={{ marginRight: "20px" }}>Chest</Label>
                    <Input type="number" />
                  </OptionCont>
                  <Row>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Tommy</Label>
                      <Input type="number" />
                    </OptionCont>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Waist</Label>
                      <Input type="number" />
                    </OptionCont>
                  </Row>
                  {selected === "female" ? (
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Hips</Label>
                      <Input type="number" />
                    </OptionCont>
                  ) : (
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Tigh</Label>
                      <Input type="number" />
                    </OptionCont>
                  )}
                  {selected === "female" ? (
                    <>
                      <OptionCont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Label style={{ marginRight: "20px" }}>
                          Half Length
                        </Label>
                        <Input type="number" />
                      </OptionCont>

                      <OptionCont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Label style={{ marginRight: "20px" }}>
                          Full Length
                        </Label>
                        <Input type="number" />
                      </OptionCont>
                    </>
                  ) : (
                    <>
                      <OptionCont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Label style={{ marginRight: "20px" }}>
                          Shirt Length
                        </Label>
                        <Input type="number" />
                      </OptionCont>

                      <OptionCont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Label style={{ marginRight: "20px" }}>
                          Trouser Length
                        </Label>
                        <Input type="number" />
                      </OptionCont>
                    </>
                  )}
                  <OptionCont style={{ display: "flex", alignItems: "center" }}>
                    <Label style={{ marginRight: "20px" }}>Sleeve Length</Label>
                    <Input type="number" />
                  </OptionCont>
                  <Row>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Arm Bicep</Label>
                      <Input type="number" />
                    </OptionCont>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Wrist</Label>
                      <Input type="number" />
                    </OptionCont>
                  </Row>
                  {selected === "male" && (
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Neck</Label>
                      <Input type="number" />
                    </OptionCont>
                  )}
                </>
              )}
            </>
          )}
        </Col>
      </Content>
      <Submit>Order</Submit>

      <OptionCont>
        <div>
          Not sure what you want?
          <span style={{ color: color.main }}>
            {" "}
            Click here to get our opinion
          </span>
        </div>
        <div>Need assistance?</div>
      </OptionCont>
    </Container>
  );
}
