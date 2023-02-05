import React, { Component } from "react";

function GoogleSlides({ url }) {
  let localUrl =
    "https://docs.google.com/presentation/d/e/2PACX-1vSnbzd__EN-Zz4AlkAmhIE-AXyUsPW8JpBKpbyHSxuab7jD3muy3xRjOFxVA6wyYd-IxAgsQtskjYJF";

  return (
    <>
      <p>Google Slides</p>
      <iframe
        src={`${url}/embed?start=false&loop=false&delayms=3000`}
        frameborder="0"
        width="480"
        height="299"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
      ></iframe>
    </>
  );
}

export default GoogleSlides;
