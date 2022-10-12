import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { color } from "../constant/parameters";
import moment from "moment";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import LoadingBox from "../component/LoadingBox";

const Container = styled.div`
  padding: 5vw 10vw;
`;
const Headers = styled.h1`
  margin-bottom: 20px;
`;
const Section = styled.div`
  background: ${color.background2};
  padding: 1vw 5vw;
  margin-bottom: 20px;
`;
const Key = styled.div`
  margin: 5px 0;
  font-weight: bold;
  text-transform: capitalize;
`;

const Title = styled.p`
  font-size: 18px;
  text-transform: uppercase;
`;
const Status = styled.div`
  padding: 5px 7px;
  background: grey;
`;
const OrderItem = styled.div`
  margin: 20px;
`;
const Row = styled.div`
  display: flex;
`;
const Image = styled.img`
  width: 150px;
  height: 200px;
`;
const Details = styled.div`
  margin: 0 20px;
  display: inline-block;
`;
const Button = styled.div`
  padding: 5px 7px;
  background: ${color.main};
  color: white;
`;
const ImageReceipt = styled.img`
  margin: 5px 0;
  width: 200px;
`;
const Key1 = styled.div`
  margin: 5px;
  flex: 1;
  font-weight: bold;
`;
const Value = styled.div`
  margin: 5px;
  flex: 2;
`;
export default function OrderDetailPage() {
  const { id: orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data.order);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getOrder();
  }, [orderId]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container>
      <Headers>ORDER DEATAILS</Headers>
      <Section>
        <Key>Order number {order._id}</Key>
        <div>
          {order.cartItems.length} item{order.cartItems.length > 0 ? "s" : ""}
        </div>
        <div>
          Placed on {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </Section>
      <Title>ITEMS IN YOUR ORDER</Title>
      <Section>
        <div>
          <Status>Delivered</Status>
        </div>
        <Key>
          On {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Key>
        <hr />
        {order.cartItems.map((item) => (
          <OrderItem>
            <Row
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Row style={{ alignItems: "center" }}>
                <Image src={item.image} alt="img" />
                <Details>
                  <Link to={`/product/${item.slug}`}>
                    <Key>{item.name}</Key>
                  </Link>
                  <div></div>
                  <Key>
                    {item.discount &&
                      (100 - Number(item.discount)) * Number(item.price)}
                  </Key>
                </Details>
              </Row>
              <Link to={`/product/${item.slug}`}>
                <Button>Buy Again</Button>
              </Link>
            </Row>
          </OrderItem>
        ))}
      </Section>
      <Row>
        <div style={{ flex: "1", marginRight: "20px" }}>
          <Title>Buyer Informations</Title>
          <Section>
            <Row>
              <Key1>Name</Key1>
              <Value>
                {order.buyer.firstName} {order.buyer.lastName}
              </Value>
            </Row>
            <Row>
              <Key1>Email</Key1>
              <Value>{order.buyer.email} </Value>
            </Row>
            <Row>
              <Key1>Phone</Key1>
              <Value>{order.buyer.phone}</Value>
            </Row>
          </Section>
        </div>
        <div style={{ flex: "1", marginLeft: "20px" }}>
          <Title>Delivery Details</Title>
          <Section>
            <Row>
              <Key1>Address</Key1>
              <Value>{order.deliveryAddress.address} </Value>
            </Row>
            <Row>
              <Key1>City</Key1>
              <Value> {order.deliveryAddress.city} </Value>
            </Row>
            <Row>
              <Key1>Region</Key1>
              <Value>{order.deliveryAddress.state} </Value>
            </Row>
            <Row>
              <Key1>Country</Key1>
              <Value>{order.deliveryAddress.country} </Value>
            </Row>
          </Section>
        </div>
      </Row>
      <Title>PAYMENT</Title>
      <Section>
        <Key>Payment Details</Key>
        <div style={{ margin: "5px 0" }}>Total: {order.totalPrice}</div>
        <ImageReceipt src={order.proof} alt="img" />
      </Section>{" "}
    </Container>
  );
}
