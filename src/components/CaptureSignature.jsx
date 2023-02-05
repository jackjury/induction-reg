import React, { Component } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "react-bootstrap";

function CaptureSignature({ sendData }) {
  const resetCanvas = () => {
    sigPad.clear();
  };
  const toBase64 = () => {
    let data = sigPad.toDataURL();
    sendData(data);
  };
  let sigPad = {};
  return (
    <>
      <div
        style={{
          border: "solid 5px",
        }}
      >
        <SignatureCanvas
          ref={(ref) => (sigPad = ref)}
          penColor="green"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
        />
      </div>
      <Button onClick={resetCanvas}>Reset</Button>
      <Button onClick={toBase64}>Save</Button>
    </>
  );
}

export default CaptureSignature;
