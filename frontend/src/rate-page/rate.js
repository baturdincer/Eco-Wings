import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rate.css";

const Rate = () => {
  const userId = localStorage.getItem("userId");
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    airlineId: "",
  });
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yorumları getir
  const fetchUserReviews = async () => {
    try {
      const res = await axios.get("https://localhost:5000/api/AirlineReview");
      const allReviews = res.data;
      const userReviews = allReviews.filter(
        (review) => review.userId === Number(userId)
      );
      setReviews(userReviews);
    } catch (error) {
      console.error("Yorumlar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, [userId]);

  // Form alanı değiştiğinde
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Yıldız rating
  const handleRatingChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  // Gönder veya güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.comment || !formData.rating || !formData.airlineId) {
      alert("Tüm alanlar zorunludur.");
      return;
    }

    try {
      if (editingReview) {
        // Güncelleme işlemi
        await axios.put(
          `https://localhost:5000/api/AirlineReview/${editingReview.id}`,
          {
            ...formData,
            id: editingReview.id,
            createdAt: editingReview.createdAt,
            userId: Number(userId),
          }
        );
      } else {
        // Yeni yorum gönder
        await axios.post("https://localhost:5000/api/AirlineReview", {
          ...formData,
          userId: Number(userId),
          createdAt: new Date().toISOString(),
        });
      }

      // Formu temizle
      setFormData({ comment: "", rating: 0, airlineId: "" });
      setEditingReview(null);

      // 🔁 Yorumlar otomatik güncellensin
      await fetchUserReviews();
    } catch (error) {
      console.error("Yorum gönderilemedi:", error);
    }
  };

  // Yorum düzenleme
  const handleEdit = (review) => {
    setFormData({
      comment: review.comment,
      rating: review.rating,
      airlineId: review.airlineId,
    });
    setEditingReview(review);
  };

  // Yorum silme
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:5000/api/AirlineReview/${id}`);
      await fetchUserReviews();
    } catch (error) {
      console.error("Yorum silinemedi:", error);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="rate-container">
      <h1>Your Airline Reviews</h1>

      {/* Yorum formu */}
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          name="comment"
          placeholder="Your review..."
          value={formData.comment}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="airlineId"
          placeholder="Airline ID"
          value={formData.airlineId}
          onChange={handleInputChange}
        />

        <div>
          {[1, 2, 3, 4, 5].map((val) => (
            <span
              key={val}
              onClick={() => handleRatingChange(val)}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: val <= formData.rating ? "#ffc107" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">
          {editingReview ? "Update Review" : "Submit Review"}
        </button>
      </form>

      {/* Yorum listesi */}
      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>
                <strong>Airline ID:</strong> {review.airlineId}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < review.rating ? "#ffc107" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(review.createdAt)}
              </p>

              <div className="review-actions">
                <button onClick={() => handleEdit(review)}>Edit</button>
                <button onClick={() => handleDelete(review.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About TicketWings</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Center</li>
              <li>Travel Blog</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Help</h3>
            <ul>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Booking Guide</li>
              <li>Travel Insurance</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Security</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <span>📘 Facebook</span>
              <span>📸 Instagram</span>
              <span>🐦 Twitter</span>
              <span>💼 LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TicketWings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Rate;
