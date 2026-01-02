import React, { useState } from "react";
import { paymentService } from "../data/paymentService";

const PaymentTest = () => {
  const [ticketId, setTicketId] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    if (!ticketId || !amount) {
      setError("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }

    try {
      const response = await paymentService.payTicket(
        parseInt(ticketId),
        parseFloat(amount)
      );
      setResult(response);
      console.log("Ödeme başarılı:", response);
    } catch (err) {
      setError("Ödeme başarısız. Sunucu yanıtı alınamadı.");
      console.error("Ödeme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Ödeme Test Sayfası</h2>
      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: "15px" }}>
          <label>Bilet ID:</label>
          <input
            type="number"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Tutar (₺):</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "İşleniyor..." : "Ödeme Yap"}
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#d4edda",
            borderRadius: "4px",
          }}
        >
          <h3>Başarılı!</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            borderRadius: "4px",
          }}
        >
          <h3>Hata!</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentTest;
