import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  console.log("location.state (gelen uçuş bilgileri):", location.state); // <-- TEST

  const initialFlight = location.state;
  const flightId = initialFlight.flightId; // veya const { flightId } = initialFlight;
  const [flight, setFlight] = useState(initialFlight);
  const [coupon, setCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(flight.price);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  console.log("userId:", localStorage.getItem("userId"));

  // Kuponu Kullan
  const handleApplyCoupon = async () => {
    if (!coupon) {
      setCouponMessage("Please enter coupon code.");
      return;
    }
    setCouponLoading(true);
    setCouponMessage("");

    // Gönderilen parametreleri logla
    console.log("Kupon API'sine gönderilen parametreler:", {
      passengerId: Number(localStorage.getItem("userId")),
      flightId: flightId,
      couponCode: coupon,
    });

    try {
      const res = await axios.post(
        "https://localhost:5000/api/Ticket/with-coupon",
        {
          passengerId: Number(localStorage.getItem("userId")),
          ticketId: flight.ticketId,
          couponCode: coupon,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Kupon response:", res.data);

      // Fiyatı manuel hesapla:
      if (res.data.discountRate) {
        const yeniFiyat =
          flight.price - (flight.price * res.data.discountRate) / 100;
        setDiscountedPrice(yeniFiyat);
        setCouponMessage("Coupon successfully applied!");
      } else {
        setCouponMessage("Coupon applied but discount rate not received.");
      }
    } catch (err) {
      setCouponMessage(
        "Coupon could not be applied: " +
          (err.response?.data?.message || "network error")
      );
    }
  };

  // Stripe ile ödeme
  const handlePayment = async () => {
    const userId = localStorage.getItem("userId"); // <-- EKLENDİ!
    if (!userId) {
      alert("You need to sign in!");
      return;
    }
    try {
      const res = await axios.post(
        "https://localhost:5000/api/Payment/pay",
        null,
        {
          params: {
            ticketId: flight.ticketId,
            amount: discountedPrice,
            userId: userId, // <-- EKLENDİ!
          },
        }
      );

      const paymentUrl = res.data.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Ödeme bağlantısı alınamadı.");
      }
    } catch (error) {
      alert("Ödeme sırasında hata oluştu.");
    }
  };

  if (!flight) {
    return <p>Flight information not found.</p>;
  }

  return (
    <div
      className="payment-page"
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1>Payment Page</h1>
      <p>
        <strong>Departure time:</strong> {flight.departure}
      </p>
      <p>
        <strong>Arrival time:</strong> {flight.arrival}
      </p>
      <p>
        <strong>Flight Number:</strong> {flight.flightNumber}
      </p>
      <p>
        <strong>Price:</strong> {discountedPrice} {flight.currency || "₺"}
      </p>

      {/* Kupon Kodu Alanı */}
      <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Kupon kodu giriniz"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={{
            padding: "0.6rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "8px",
          }}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={couponLoading}
          style={{
            backgroundColor: "#8a2be2",
            color: "white",
            padding: "0.6rem 1.1rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          {couponLoading ? "Processing..." : "Use Coupon"}
        </button>
        {couponMessage && (
          <p
            style={{
              marginTop: "0.7rem",
              color: couponMessage.includes("başarıyla") ? "green" : "red",
            }}
          >
            {couponMessage}
          </p>
        )}
      </div>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "1rem",
          backgroundColor: "#6a1b9a",
          color: "white",
          padding: "0.8rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "600",
        }}
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default PaymentPage;
