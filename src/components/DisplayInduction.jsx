import React, { Component, useEffect } from "react";
import GoogleSlides from "./GoogleSlides";
import Youtube from "./youtube";

function DisplayInduction({ url, urlType }) {
  useEffect(() => {}, []);
  useEffect(() => {
    console.log(url, "type: ", urlType);
  });
  if (urlType === "glide") {
    return <GoogleSlides url={url} />;
  }
  if (urlType === "yt") {
    return (
      <>
        <Youtube url={url} />
      </>
    );
  }
  if (urlType === "vimeo") {
    return (
      <>
        <p>Vimeo</p>
      </>
    );
  }
}

export default DisplayInduction;
