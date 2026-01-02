// src/components/PaymentFail.js
import React from "react";

const PaymentFail = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Ödeme Başarısız!</h1>
    <p>
      Ödemeniz tamamlanamadı veya iptal edildi.
      <br />
      Lütfen tekrar deneyin ya da{" "}
      <b>profilinizden biletlerinizi kontrol edin</b>.
    </p>
    <a
      href="/"
      style={{
        display: "inline-block",
        marginTop: "1rem",
        padding: "0.7rem 1.5rem",
        background: "#8a2be2",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Ana Sayfaya Dön
    </a>
  </div>
);

export default PaymentFail;
