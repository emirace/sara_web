import React from "react";
import { useParams } from "react-router-dom";

export default function ProductScreen() {
  let { slug } = useParams();
  return <div>{slug}</div>;
}
