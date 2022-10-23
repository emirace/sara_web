import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "../../constant/parameters";
import { Store } from "../../Store";
import { BiChevronLeft } from "react-icons/bi";
import LoadingBox from "../LoadingBox";

const Container = styled.div``;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
const Section = styled.div`
  background: ${color.background2};
  padding: 1vw 5vw;
  margin-bottom: 20px;
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

const Heading = styled.div`
  text-transform: uppercase;
  margin: 20px 20px 20px 0;
`;
const Key = styled.div`
  font-weight: bold;
  flex: 1;
`;
const Value = styled.div`
  flex: 3;
`;
const Button = styled.div`
  height: 35px;
  width: 150px;
  cursor: pointer;
  background: ${color.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: white;
  &:hover {
    color: black;
  }
  @media (max-width: 550px) {
    margin-left: auto;
  }
`;

const Back = styled.div`
  display: none;
  align-items: center;
  padding: 0 10px;

  & svg {
    font-size: 20px;
  }
  @media (max-width: 550px) {
    display: flex;
  }
`;
export default function Profile({ setShowMobileMenu }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/accounts", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);
        setAccount(data.accounts);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    getAccount();
  }, [userInfo]);
  const handleUpdate = async () => {
    if (!accountName) {
      setError2("Enter a valid Account Name");
      return;
    }
    if (!accountNumber) {
      setError2("Enter a valid Account Number");
      return;
    }
    if (!bankName) {
      setError2("Enter a valid Bank Name");
      return;
    }
    setLoading2(true);
    try {
      const { data } = await axios.post(
        "/api/accounts",
        {
          accountName,
          accountNumber,
          bankName,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setAccount(data.account);
      setAccountName("");
      setAccountNumber("");
      setBankName("");
      setLoading2(false);
    } catch (err) {
      setLoading2(false);
      setError2(err.message);
    }
  };

  return (
    <Container>
      <Title>Welcome {userInfo.username}</Title>
      <Back
        onClick={() => {
          setShowMobileMenu(true);
        }}
      >
        <BiChevronLeft />
        Back
      </Back>
      <Section>
        <Heading>Bank Detail</Heading>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <Row>
              <Key>Account Name</Key>
              <Value>{account.accountName}</Value>
            </Row>
            <Row>
              <Key>Account Number</Key>
              <Value>{account.accountNumber}</Value>
            </Row>
            <Row>
              <Key>Bank Name</Key>
              <Value>{account.bankName}</Value>
            </Row>
          </>
        )}
      </Section>
      <Section>
        <Heading>Update Bank Detail</Heading>
        {error2 && <div>{error}</div>}
        <Row>
          <Label>Account Name</Label>
          <div style={{ width: "80%" }}>
            <Input
              type="text"
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <Label>Account Number</Label>
          <div style={{ width: "80%" }}>
            <Input
              type="number"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <Label>Bank Name</Label>
          <div style={{ width: "80%" }}>
            <Input type="text" onChange={(e) => setBankName(e.target.value)} />
          </div>
        </Row>
        {loading2 ? (
          <LoadingBox />
        ) : (
          <Button onClick={() => handleUpdate()}>Update</Button>
        )}
      </Section>
    </Container>
  );
}
