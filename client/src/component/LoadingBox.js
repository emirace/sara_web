import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingBox({ props }) {
  return (
    <Spinner animation="border" role="status" {...props}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
