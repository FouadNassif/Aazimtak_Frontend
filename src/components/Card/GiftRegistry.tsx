import React from "react";

interface WeddingDetail {
  gift_type: string;
  gift_details: string;
}

interface Props {
  weddingDetail: WeddingDetail;
}

const GiftRegistry: React.FC<Props> = ({ weddingDetail }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "8rem",
        marginBottom: "8rem",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", marginBottom: "1.75rem" }}>
        Gift Registry
      </h2>

      <img
        src="/assets/svg/gift.svg"
        alt="Gift Icon"
        style={{ width: "2.5rem", marginBottom: "1.25rem" }}
      />
      <p
        style={{
          fontSize: "1.25rem",
          width: "91.66%",
          marginBottom: "1.25rem",
        }}
      >
        Your Love, Laughter and Presence are all we could wish for on our
        special day. For those who wish, a Wedding List is available at
      </p>
      <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        {weddingDetail.gift_type}
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          marginBottom: "1.75rem",
          width: "66.66%",
        }}
      >
        {weddingDetail.gift_details}
      </p>
    </div>
  );
};

export default GiftRegistry;
