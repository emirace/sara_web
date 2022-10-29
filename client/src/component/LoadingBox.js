import React from "react";
import ReactLoading from "react-loading";

export default function LoadingBox(props) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${props && props.comn === "inline" ? "100%" : "100px"}`,
      }}
    >
      {console.log(props)}
      <ReactLoading
        type="spinningBubbles"
        color="white"
        height={60}
        width={60}
        {...props}
      />
    </div>
  );
}
