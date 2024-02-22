import React, { Component, useEffect } from "react";
import GoogleSlides from "./GoogleSlides";

function DisplayInduction({ url, urlType }) {
  useEffect(() => {}, []);
  useEffect(() => {
    console.log(url, "type: ", urlType);
  });
  return <>{urlType === "gslide" ? <GoogleSlides url={url} /> : <></>}</>;
}

export default DisplayInduction;
