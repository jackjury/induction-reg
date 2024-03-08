import React, { Component, useEffect } from "react";

function Youtube({ url }) {
  useEffect(() => {
    console.log(url);
  });
  const getVID = (url) => {
    let output = url.split("v=")[1];
    return output;
  };
  return (
    <>
      <p>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${getVID(url)}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </p>
    </>
  );
}

export default Youtube;
