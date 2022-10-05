import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import { color } from "../constant/parameters";
import { Store } from "../Store";
import { FiKey } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(prop) => (prop.mode === "darkmode" ? "black" : "#d4d4d4")};
`;
const Content = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  box-shadow: 0px 0px 35px 0px ${color.main};
`;
const Col = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;
const LogoCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 50%;
`;
const Form = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 40px;
  margin-bottom: 30px;
  font-weight: bold;
  color: white;
`;
const Section = styled.div``;
const InputCont = styled.div`
  margin: 20px 0;
  background: white;
  display: flex;
  height: 40px;
  align-items: center;

  & svg {
    margin: 0 10px;
    font-size: 20px;
  }
`;
const Input = styled.input`
  background: none;
  border: 0;
  flex: 1;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: ${color.border};
  }
`;
const Button = styled.div`
  color: white;
  background: ${color.main};
  padding: 10px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
const Error = styled.div`
  color: red;
`;

export default function LoginPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { mode } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(email, password);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(data);
      if (data.success) {
        navigate("/dashboard");

        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <Container mode={mode}>
      <Content>
        <Col>
          <LogoCont>
            <Logo src="/images/saralzwhite.png" alt="logo" />
          </LogoCont>
        </Col>
        <Col style={{ background: color.border }}>
          <Form>
            <Title>Welcome!</Title>
            <Error>{error}</Error>
            <Section>
              <InputCont>
                <FaEnvelope color={color.border} />
                <Input
                  type="text"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onFocus={() => setError("")}
                />
              </InputCont>
              <InputCont>
                <FiKey color={color.border} />
                <Input
                  type="text"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onFocus={() => setError("")}
                />
              </InputCont>
            </Section>
            <Button
              style={{ background: loading ? "grey" : color.main }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Form>
        </Col>
      </Content>
    </Container>
  );
}
