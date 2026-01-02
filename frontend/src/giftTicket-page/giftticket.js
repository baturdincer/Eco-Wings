import React, { useEffect, useState } from "react";
import axios from "axios";

const GiftTicket = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("https://localhost:5000/api/Coupon");
        // SADECE receiverUserId kendi userId'ne eşit olanları filtrele
        const myGiftCoupons = res.data.filter(
          (coupon) => coupon.receiverUserId === userId
        );
        setCoupons(myGiftCoupons);
      } catch (err) {
        setError("Kuponlar alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userId]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        fontFamily: "Poppins, Arial, sans-serif",
      }}
    >
      <h1>My Gift Coupons</h1>
      {loading && <p>loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && coupons.length === 0 && (
        <p>Your Gift Voucher has expired.</p>
      )}

      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          style={{
            border: "1px solid #8a2be2",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "#f8f4ff",
          }}
        >
          <p>
            <strong>Coupon Code:</strong> {coupon.code}
          </p>
          <p>
            <strong>Discount Rate:</strong> %
            {coupon.discountRate >= 1
              ? coupon.discountRate
              : Math.round(coupon.discountRate * 100)}
          </p>
          <p>
            <strong>Sender User ID:</strong> {coupon.senderUserId}
          </p>
          <p>
            <strong>Expiration date:</strong>{" "}
            {new Date(coupon.expiryDate).toLocaleDateString("tr-TR")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GiftTicket;
