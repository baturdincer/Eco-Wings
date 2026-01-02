import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./hediyesayfası.css";

const HediyeSayfasi = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [giftResult, setGiftResult] = useState(null); // API dönüşü için state
  const navigate = useNavigate();

  const handleSendGift = async () => {
    setLoading(true);
    setError("");
    setGiftResult(null);

    try {
      const res = await axios.post("https://localhost:5000/api/Coupon/gift", {
        senderEmail,
        receiverEmail,
      });

      // API'den gelen cevabı state'e kaydet
      setGiftResult(res.data);
      // İstersen alert gösterme, direkt sayfada gösteriyoruz!
      // alert("Hediye kupon başarıyla gönderildi.");
      // navigate("/"); // Yönlendirme kaldırıldı, kullanıcı sonucu görebilsin diye
    } catch (err) {
      console.error("Kupon gönderilemedi:", err);
      setError("Kupon gönderilirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hediye-sayfasi-container">
      <h1>Hediye Kupon Gönder</h1>

      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label>Gönderen Email:</label>
        <input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          placeholder="Gönderen email"
        />
      </div>

      <div className="form-group">
        <label>Alıcı Email:</label>
        <input
          type="email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          placeholder="Alıcı email"
        />
      </div>

      <button onClick={handleSendGift} disabled={loading}>
        {loading ? "Gönderiliyor..." : "Kuponu Gönder"}
      </button>

      {/* Gönderim sonrası API cevabını göster */}
      {giftResult && (
        <div className="gift-result-card">
          <h2>Kupon Başarıyla Gönderildi!</h2>
          {giftResult.message && <p>{giftResult.message}</p>}
          <p>
            <strong>Kupon Kodu:</strong> {giftResult.couponCode}
          </p>
          <p>
            <strong>İndirim Miktarı:</strong> {giftResult.discountAmount}
            {" Ücretsiz Hediye!"}
            {giftResult.currency}
          </p>
          {giftResult.ticketId && (
            <p>
              <strong>Bilet ID:</strong> {giftResult.ticketId}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HediyeSayfasi;
