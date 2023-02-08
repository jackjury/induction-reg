import React, { Component, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "react-bootstrap";

function CaptureSignature({ sendData }) {
  const [data, setData] = useState(null);
  const resetCanvas = () => {
    sigPad.clear();
    setData(null);
  };
  const toBase64 = () => {
    let data = sigPad.toDataURL();
    sendData(data);
    setData(data);
  };
  let sigPad = {};
  return (
    <div className="mb-5">
      {data ? <p>Saved</p> : <></>}
      <div
        style={{
          border: "solid 5px",
        }}
      >
        <SignatureCanvas
          ref={(ref) => (sigPad = ref)}
          penColor="blue"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
        />
      </div>
      <div>
        <Button className="m-2" onClick={resetCanvas}>
          Reset
        </Button>
        <Button className="m-2" onClick={toBase64}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default CaptureSignature;
