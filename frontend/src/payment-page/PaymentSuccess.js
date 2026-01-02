import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/flight-tracking");
      // Eğer route çalışmazsa şu satırı kullanabilirsin:
      // window.location.href = "/profile-settings";
    }, 1500); // 1.5 saniye beklet

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Ödeme Başarılı!</h1>
      <p>Biletinizi Tracking sayfasında görebilirsiniz.</p>
      <p style={{ color: "#888", marginTop: "1rem" }}>
        Yönlendiriliyorsunuz...
      </p>
    </div>
  );
};

export default PaymentSuccess;
