import React from "react";

interface Props {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

const ImagesLayout5: React.FC<Props> = ({ image1, image2, image3, image4, image5 }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    height: "100vh",
    gap: "8px", // Space between rows
  };

  const topRowStyle = {
    display: "flex",
    gap: "8px",
    height: "33.33%", // Top row takes 1/3 of the height
  };

  const bottomRowStyle = {
    display: "flex",
    gap: "8px",
    height: "50vh", // Bottom row takes 50% of the height
  };

  const leftColumnStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    flex: 1,
  };

  const fullImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  };

  const largeBoxStyle = {
    flex: 2,
    height: "100%",
  };

  const smallBoxStyle = {
    flex: 1,
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      {/* Top Row */}
      <div style={topRowStyle}>
        <div style={{ flex: 8 }}>
          <img src={image1} alt="Image 1" style={fullImageStyle} />
        </div>
        <div style={{ flex: 4 }}>
          <img src={image2} alt="Image 2" style={fullImageStyle} />
        </div>
      </div>

      {/* Bottom Row */}
      <div style={bottomRowStyle}>
        <div style={leftColumnStyle}>
          <div style={smallBoxStyle}>
            <img src={image3} alt="Image 3" style={fullImageStyle} />
          </div>
          <div style={smallBoxStyle}>
            <img src={image4} alt="Image 4" style={fullImageStyle} />
          </div>
        </div>
        <div style={largeBoxStyle}>
          <img src={image5} alt="Image 5" style={fullImageStyle} />
        </div>
      </div>
    </div>
  );
};

export default ImagesLayout5;