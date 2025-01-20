import React from "react";

interface BibleVerseProps {
  verse: string;
  reference: string;
}

const BibleVerse: React.FC<BibleVerseProps> = ({ verse, reference }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src="/assets/svg/quote.svg"
        alt="Quote Icon"
        style={{ width: "2.5rem" }}
      />
      <p style={{ color: "black", width: "75%", margin: "0.25rem 0" }}>
        {verse}
      </p>
      <p>{reference}</p>
    </div>
  );
};

export default BibleVerse;
