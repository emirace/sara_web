import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SelectBox from "../component/SelectBox";
import Select from "react-select";
import { AiOutlinePicture } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import axios from "axios";
import LoadingBox from "../component/LoadingBox";

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

const Remove = styled.div`
  padding: 10px 7px;
  border: 1px solid ${color.main};
  margin: 15px;
  cursor: pointer;
  width: 150px;
  text-align: center;
  color: ${color.main};
`;

const Error = styled.div`
  color: red;
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
  // const search = useLocation().search;
  // const content = new URLSearchParams(search);
  // const style=content.get("style")
  // con
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { style } = state;
  useEffect(() => {
    if (style) {
      setImage([`${style.image}`]);
      handleOnChange(style.styleType, "styleType");
      handleOnChange(style.image, "style");
      if (style.styleType === "gallery") {
        handleOnChange(style._id, "galleryId");
      } else {
        handleOnChange(style._id, "catalogueId");
      }
    } else {
      setImage(null);
    }
    console.log(style);
  }, [style]);

  const [styleType, setStyleType] = useState(false);
  const [image, setImage] = useState([]);
  const [selected, setSelected] = useState("");
  const [showMeasure, setShowMeasure] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const colorStyles = {
    control: (styles, { isFocused }) => {
      console.log("focus", isFocused);
      return {
        ...styles,
        backgroundColor: "#000",
        borderColor: isFocused ? color.main : color.border,
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

  const handleOnChange = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const [loading, setLoading] = useState(false);
  const [errorImage, setErrorImage] = useState("");
  const handleUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(image);
      handleOnChange(data.secure_url, "style");
      setImage([data.secure_url]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorImage("encounter a problem uploading image");
    }
  };

  const handleBookOrder = () => {
    if (!input.style) {
      handleError("Please select a style", "style");
      return;
    }
    if (!input.fabricChioce) {
      handleError("Please select  fabric chioce", "fabricChioce");
      return;
    }

    if (!input.userCountry) {
      handleError("Please select  your Country", "userCountry");
      return;
    }

    if (!input.unit) {
      handleError("Please select  unit of measurement", "unit");
      return;
    }

    if (!input.gender || !input.measurement) {
      handleError("Please enter your measurements", "measurement");
      return;
    }

    console.log(input);
    console.log(error);

    ctxDispatch({ type: "BOOK_ORDER", payload: input });
    navigate("/bookdelivery");
  };

  const changeImage = () => {
    console.log("remove");
    ctxDispatch({ type: "REMOVE_STYLE" });
    setStyleType(false);
    setImage(null);
  };

  return (
    <Container>
      {console.log(image, style)}
      <h1>Book an Item</h1>
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
                {loading ? (
                  <LoadingBox />
                ) : (
                  <Upload htmlFor="uploadstyle">
                    <AiOutlinePicture />
                    <div>Add photo</div>
                  </Upload>
                )}
                {errorImage && <div>{errorImage}</div>}
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="uploadstyle"
                  onChange={(e) => handleUpload(e)}
                />
              </OptionCont>
            )
          ) : (
            <>
              <ImageCont>
                {image.map((img) => (
                  <Image key={img} src={img} alt="/img" />
                ))}
              </ImageCont>
              <Remove onClick={changeImage}>Change</Remove>
            </>
          )}
          {console.log(image)}
        </Col>
        <Col>
          <OptionCont>
            <Label>Select Country</Label>
            <Select
              onFocus={() => {
                handleError(null, "userCountry");
              }}
              onChange={(e) => handleOnChange(e.value, "userCountry")}
              options={countries}
              styles={colorStyles}
            />
            {error.userCountry && <Error>{error.userCountry}</Error>}
          </OptionCont>
          <OptionCont>
            <Label>Fabric Chioce</Label>
            <Select
              onFocus={() => handleError(null, "fabricChioce")}
              onChange={(e) => handleOnChange(e.value, "fabricChioce")}
              options={fabrics}
              styles={colorStyles}
            />
            {error.fabricChioce && <Error>{error.fabricChioce}</Error>}
          </OptionCont>
          <OptionCont>
            <Label>Select measurement unit</Label>
            <Select
              onFocus={() => handleError(null, "unit")}
              onChange={(e) => handleOnChange(e.value, "unit")}
              options={unit}
              styles={colorStyles}
            />
            {error.unit && <Error>{error.unit}</Error>}
            <Chioce onClick={() => setShowMeasure(!showMeasure)}>
              Add measurement
            </Chioce>
            {error.measurement && <Error>{error.measurement}</Error>}
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
                    onChange={(e) => {
                      setSelected(e.target.value);
                      handleOnChange(e.target.value, "gender");
                    }}
                    onFocus={() => handleError(null, "measurement")}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onFocus={() => handleError(null, "measurement")}
                    onChange={(e) => {
                      setSelected(e.target.value);
                      handleOnChange(e.target.value, "gender");
                    }}
                  />
                  <label htmlFor="male">Male</label>
                </Radio>
              </OptionCont>
              {selected && (
                <>
                  <OptionCont style={{ display: "flex", alignItems: "center" }}>
                    <Label style={{ marginRight: "20px" }}>Shoulders</Label>
                    <Input
                      type="number"
                      onFocus={() => handleError(null, "measurement")}
                      onChange={(e) =>
                        handleOnChange(
                          { ...input.measurement, shoulders: e.target.value },
                          "measurement"
                        )
                      }
                    />
                  </OptionCont>
                  <OptionCont style={{ display: "flex", alignItems: "center" }}>
                    <Label style={{ marginRight: "20px" }}>Chest</Label>
                    <Input
                      type="number"
                      onChange={(e) =>
                        handleOnChange(
                          { ...input.measurement, chest: e.target.value },
                          "measurement"
                        )
                      }
                    />
                  </OptionCont>
                  <Row>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Tommy</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, tommy: e.target.value },
                            "measurement"
                          )
                        }
                      />
                    </OptionCont>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Waist</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, waist: e.target.value },
                            "measurement"
                          )
                        }
                      />
                    </OptionCont>
                  </Row>
                  {selected === "female" ? (
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Hips</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, hips: e.target.value },
                            "measurement"
                          )
                        }
                      />
                    </OptionCont>
                  ) : (
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Tigh</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, tigh: e.target.value },
                            "measurement"
                          )
                        }
                      />
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
                        <Input
                          type="number"
                          onChange={(e) =>
                            handleOnChange(
                              {
                                ...input.measurement,
                                halfLength: e.target.value,
                              },
                              "measurement"
                            )
                          }
                        />
                      </OptionCont>

                      <OptionCont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Label style={{ marginRight: "20px" }}>
                          Full Length
                        </Label>
                        <Input
                          type="number"
                          onChange={(e) =>
                            handleOnChange(
                              {
                                ...input.measurement,
                                fullLength: e.target.value,
                              },
                              "measurement"
                            )
                          }
                        />
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
                        <Input
                          type="number"
                          onChange={(e) =>
                            handleOnChange(
                              {
                                ...input.measurement,
                                shirtLenth: e.target.value,
                              },
                              "measurement"
                            )
                          }
                        />
                      </OptionCont>

                      <OptionCont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Label style={{ marginRight: "20px" }}>
                          Trouser Length
                        </Label>
                        <Input
                          type="number"
                          onChange={(e) =>
                            handleOnChange(
                              {
                                ...input.measurement,
                                trouserLength: e.target.value,
                              },
                              "measurement"
                            )
                          }
                        />
                      </OptionCont>
                    </>
                  )}
                  <OptionCont style={{ display: "flex", alignItems: "center" }}>
                    <Label style={{ marginRight: "20px" }}>Sleeve Length</Label>
                    <Input
                      type="number"
                      onChange={(e) =>
                        handleOnChange(
                          {
                            ...input.measurement,
                            SleeveLength: e.target.value,
                          },
                          "measurement"
                        )
                      }
                    />
                  </OptionCont>
                  <Row>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Arm Bicep</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, armBicap: e.target.value },
                            "measurement"
                          )
                        }
                      />
                    </OptionCont>
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Wrist</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, wrist: e.target.value },
                            "measurement"
                          )
                        }
                      />
                    </OptionCont>
                  </Row>
                  {selected === "male" && (
                    <OptionCont
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Label style={{ marginRight: "20px" }}>Neck</Label>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleOnChange(
                            { ...input.measurement, neck: e.target.value },
                            "measurement"
                          )
                        }
                      />
                    </OptionCont>
                  )}
                </>
              )}
            </>
          )}
        </Col>
      </Content>
      {error.style && (
        <Error style={{ marginLeft: "auto" }}>{error.style}</Error>
      )}
      <Submit onClick={handleBookOrder}>Order</Submit>

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
