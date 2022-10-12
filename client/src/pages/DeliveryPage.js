import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../constant/parameters";
import { Store } from "../Store";

const Container = styled.div`
  padding: 5vw;
`;
const Heading = styled.h1`
  margin-top: 0;
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 4;
  padding: 0 50px;
  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;
const Right = styled.div`
  padding: 30px;
  background: ${color.border};
  flex: 2;
  @media (max-width: 500px) {
    display: none;
  }
`;
const Form = styled.div``;

const OptionCont = styled.div`
  margin: 30px 0;
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

const SumCont = styled.div`
  margin: 30px 0;
`;

const SubHeading = styled.h2`
  margin: 0 0 20px 0;
`;
const SumItem = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
const SumKey = styled.div`
  flex: 2;
  font-size: 20px;
`;
const SumValue = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;
const Promo = styled.div`
  display: flex;
  align-items: center;
`;
const CheckOutCont = styled.div`
  margin-top: 50px;
`;
const TotalCont = styled.div`
  display: flex;
  font-size: 18px;
`;
const Total = styled.div`
  flex: 2;
`;
const Value = styled.div`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;

const CheckOutButton = styled.div`
  width: 200px;
  background: ${color.main};
  color: white;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  margin-top: 30px;
  padding: 8px;
  &:hover {
    color: black;
  }
`;
const ButtonCont = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Back = styled.div`
  width: 150px;
  background: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 20px;
  padding: 8px;
  border: 1px solid ${color.main};
  &:hover {
    background: ${color.main};
  }
  @media (max-width: 500px) {
    margin-left: 0;
  }
`;
const Error = styled.div`
  color: red;
`;

const ImageLabel = styled.label`
  border: 1px dashed ${color.main};
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  & svg {
    font-size: 20px;
  }
`;

export default function DeliveryPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const { cart } = state;
  const [tab, setTab] = useState("info");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    lastName: "",
    firstName: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    deliveryPhone: "",
    state: "",
  });
  const [error, setError] = useState("");

  const handleOnChange = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text.trim() }));
  };
  const handleError = (errorMessage, input) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleOnChange(data.secure_url, "proof");
    } catch (err) {}
  };

  const handlebuyer = () => {
    if (!input.email) {
      handleError("Please enter an email", "email");
      return;
    } else if (
      !input.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      handleError("Please enter a valid email", "email");
      return;
    }

    if (!input.firstName) {
      handleError("Please enter your first name", "firstName");
      return;
    }
    if (!input.lastName) {
      handleError("Please enter your last name", "lastName");
      return;
    }
    if (!input.phone) {
      handleError("Please enter your phone number", "phone");
      return;
    }
    ctxDispatch({
      type: "ADD_BUYER",
      payload: {
        email: input.email,
        lastName: input.lastName,
        firstName: input.firstName,
        phone: input.phone,
      },
    });
    setTab("delivery");
  };
  const handledelivery = () => {
    console.log(input);
    if (!input.country) {
      handleError("Please enter your country", "country");
      return;
    }
    if (!input.address) {
      handleError("Please enter your address", "address");
      return;
    }
    if (!input.city) {
      handleError("Please enter your city", "city");
      return;
    }
    if (!input.state) {
      handleError("Please enter your state", "state");
      return;
    }
    if (!input.deliveryPhone) {
      handleError("Please enter your receiver phone number", "deliveryPhone");
      return;
    }
    ctxDispatch({
      type: "ADD_DELIVERY_ADDRESS",
      payload: {
        country: input.country,
        address: input.address,
        city: input.city,
        phone: input.deliveryPhone,
        state: input.state,
      },
    });
    setTab("payment");
  };

  const handleOrder = async () => {
    if (!input.proof) {
      handleError("Please upload an image of receipt", "proof");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/orders", {
        cartItems: cart,
        deliveryAddress: {
          country: input.country,
          address: input.address,
          city: input.city,
          phone: input.deliveryPhone,
          state: input.state,
        },
        buyer: {
          email: input.email,
          lastName: input.lastName,
          firstName: input.firstName,
          phone: input.phone,
        },
        totalPrice: cart.reduce((a, c) => a + c.price, 0),
        proof: input.proof,
      });
      console.log(data);
      if (data.successs) {
        navigate(`ordercreated/${data.order._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const displayTab = (item) => {
    switch (item) {
      case "info":
        return (
          <div>
            <SubHeading>Who is placing this order?</SubHeading>
            <Form>
              <OptionCont>
                <Label>Email</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "email")}
                  value={input.email}
                  onFocus={() => {
                    handleError(null, "email");
                  }}
                  type="text"
                />
                {error.email && <Error>{error.email}</Error>}
              </OptionCont>
              <OptionCont>
                <Label>First Name</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "firstName")}
                  onFocus={() => {
                    handleError(null, "firstName");
                  }}
                  type="text"
                />
                {error.firstName && <Error>{error.firstName}</Error>}
              </OptionCont>
              <OptionCont>
                <Label>Last Name</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "lastName")}
                  onFocus={() => {
                    handleError(null, "lastName");
                  }}
                  type="text"
                />
                {error.lastName && <Error>{error.lastName}</Error>}
              </OptionCont>

              <OptionCont>
                <Label>Phone Number</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "phone")}
                  onFocus={() => {
                    handleError(null, "phone");
                  }}
                  type="number"
                />
                {error.phone && <Error>{error.phone}</Error>}
              </OptionCont>

              <CheckOutButton onClick={handlebuyer}>Continue</CheckOutButton>
            </Form>
          </div>
        );
      case "delivery":
        return (
          <div>
            <SubHeading>Where would you like your order sent?</SubHeading>
            <Form>
              <OptionCont>
                <Label>Country</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "country")}
                  value={input.country}
                  onFocus={() => {
                    handleError(null, "country");
                  }}
                  type="text"
                />
                {error.country && <Error>{error.country}</Error>}
              </OptionCont>
              <OptionCont>
                <Label>Address</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "address")}
                  value={input.address}
                  onFocus={() => {
                    handleError(null, "address");
                  }}
                  type="text"
                />
                {error.address && <Error>{error.address}</Error>}
              </OptionCont>
              <OptionCont>
                <Label>City</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "city")}
                  value={input.city}
                  onFocus={() => {
                    handleError(null, "city");
                  }}
                  type="text"
                />
                {error.city && <Error>{error.city}</Error>}
              </OptionCont>

              <OptionCont>
                <Label>State/Region/Province</Label>
                <Input
                  onChange={(e) => handleOnChange(e.target.value, "state")}
                  value={input.state}
                  onFocus={() => {
                    handleError(null, "state");
                  }}
                  type="text"
                />
                {error.state && <Error>{error.state}</Error>}
              </OptionCont>
              <OptionCont>
                <Label>Phone</Label>
                <Input
                  onChange={(e) =>
                    handleOnChange(e.target.value, "deliveryPhone")
                  }
                  value={input.deliveryPhone}
                  onFocus={() => {
                    handleError(null, "deliveryPhone");
                  }}
                  type="number"
                />
                {error.deliveryPhone && <Error>{error.deliveryPhone}</Error>}
              </OptionCont>
              <ButtonCont>
                <CheckOutButton onClick={handledelivery}>
                  Continue
                </CheckOutButton>
                <Back onClick={() => setTab("info")}>Back</Back>
              </ButtonCont>
            </Form>
          </div>
        );
      case "payment":
        return (
          <div>
            <SubHeading>Make Payment</SubHeading>
            <Form>
              <OptionCont>
                <Label>Account Number</Label>
              </OptionCont>

              <OptionCont>
                <Label>Account Name</Label>
              </OptionCont>
              <OptionCont>
                <Label>Bank Name</Label>
              </OptionCont>

              <OptionCont style={{ padding: "20px" }}>
                <Label>
                  Upload the screenshort of Receipt/teller to comfirm payment
                </Label>
                {input.proof && (
                  <img src={input.proof} alt="img" style={{ width: "100px" }} />
                )}
                <ImageLabel htmlFor="receipt">
                  <AiOutlinePicture /> Add Receipt
                </ImageLabel>
                {error.proof && <Error>{error.proof}</Error>}

                <input
                  type="file"
                  id="receipt"
                  onFocus={() => handleError(null, "deliveryPhone")}
                  style={{ display: "none" }}
                  onChange={(e) => handleUpload(e)}
                />
              </OptionCont>

              <ButtonCont>
                <CheckOutButton onClick={handleOrder}>Order</CheckOutButton>
                <Back onClick={() => setTab("delivery")}>Back</Back>
              </ButtonCont>
            </Form>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <Container>
      <Content>
        <Left>
          <Heading>Checkout</Heading>
        </Left>
        <Center>{displayTab(tab)}</Center>
        <Right>
          <SubHeading>Items</SubHeading>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <SumCont>
                {cart.map((cartItem) => (
                  <SumItem>
                    <div>
                      <SumKey>{cartItem.name}</SumKey>
                      <div>desscription</div>
                    </div>
                    <SumValue>${cartItem.price}</SumValue>
                  </SumItem>
                ))}
              </SumCont>
            </div>
            <CheckOutCont>
              <TotalCont>
                <Total>Total</Total>
                <Value>${cart.reduce((a, c) => a + c.price, 0)}</Value>
              </TotalCont>
            </CheckOutCont>
          </div>
        </Right>
      </Content>
    </Container>
  );
}
