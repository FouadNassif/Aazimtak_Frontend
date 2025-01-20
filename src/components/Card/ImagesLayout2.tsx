import React from "react";

interface Props {
  image1: string;
  image2: string;
}

const ImagesLayout2: React.FC<Props> = ({ image1, image2 }) => {
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as "cover",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <div style={{ width: "100%", height: "16rem" }}>
        <img src={image1} alt="Image 1" style={imageStyle} />
      </div>
      <div style={{ width: "100%", height: "16rem" }}>
        <img src={image2} alt="Image 2" style={imageStyle} />
      </div>
    </div>
  );
};

export default ImagesLayout2;
