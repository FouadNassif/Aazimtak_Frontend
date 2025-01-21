import React from "react";

interface Props {
  image1: string;
  image2: string;
  image3: string;
}

const ImagesLayout3: React.FC<Props> = ({ image1, image2, image3 }) => {
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as "cover",
  };

  return (
    <div style={{ display: "flex" }}>
      {/* First image container */}
      <div style={{ width: "50%", display: "flex" }}>
        <img src={image1} alt="Image 1" style={imageStyle} />
      </div>

      {/* Second image container */}
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {/* Second image */}
        <div style={{ flex: 1, marginLeft: "0.25rem" }}>
          <img src={image2} alt="Image 2" style={imageStyle} />
        </div>
        {/* Third image */}
        <div style={{ display: "flex", marginLeft: "0.25rem" }}>
          <img src={image3} alt="Image 3" style={imageStyle} />
        </div>
      </div>
    </div>
  );
};

export default ImagesLayout3;
