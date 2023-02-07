import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "../../img/inductmelive-icon-only-black.png";
import { Button } from "react-bootstrap";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: logo,
  dotsOptions: {
    color: "#0718C4",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

function QRCode({ uuid, projectName }) {
  const [url, setUrl] = useState(`${process.env.REACT_APP_URL}sign/${uuid}`);
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
      name: projectName,
    });
  };

  return (
    <div className="mt-5">
      <div ref={ref} />

      <div style={styles.inputWrapper}>
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>
      <Button onClick={onDownloadClick}>Download QR Code</Button>
    </div>
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};

export default QRCode;
