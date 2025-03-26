import React from "react";

interface Props {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

const ImagesLayout4: React.FC<Props> = ({
  image1,
  image2,
  image3,
  image4,
}) => {
  const imageStyle = {
    width: "100%",
    objectFit: "cover" as const,
  };

  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      {/* First column */}
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <img
          src={image1}
          alt="Image 1"
          style={{ ...imageStyle, height: "40%" }}
        />
        <img
          src={image2}
          alt="Image 2"
          style={{ ...imageStyle, height: "60%" }}
        />
      </div>

      {/* Second column */}
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <img
          src={image3}
          alt="Image 3"
          style={{ ...imageStyle, height: "50%" }}
        />
        <img
          src={image4}
          alt="Image 4"
          style={{ ...imageStyle, height: "50%" }}
        />
      </div>
    </div>
  );
};

export default ImagesLayout4;