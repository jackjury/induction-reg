import React, { Component, useEffect } from "react";

function GoogleSlides({ url }) {
  useEffect(() => {
    console.log(url);
  });
  return (
    <>
      <iframe
        src={`${url}/embed?start=false&loop=false&delayms=3000`}
        frameborder="0"
        width="100%"
        height="299"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
      ></iframe>
    </>
  );
}

export default GoogleSlides;
