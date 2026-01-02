import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyCoupon = {
  discountRate: "",
  expiryDate: "",
};

const AdminKampanya = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(emptyCoupon);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Kuponları getir
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5000/api/Coupon");
      setCoupons(res.data);
    } catch {
      setError("Kuponlar yüklenemedi.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Form inputları
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Ekle/güncelle gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.discountRate || !form.expiryDate) {
      setError("İndirim oranı ve bitiş tarihi zorunlu!");
      return;
    }
    try {
      if (editingId) {
        // GÜNCELLE
        await axios.put(`https://localhost:5000/api/Coupon/${editingId}`, {
          ...form,
          id: editingId,
        });
      } else {
        // EKLE
        await axios.post("https://localhost:5000/api/Coupon/create", {
          discountRate: Number(form.discountRate),
          expiryDate: form.expiryDate,
        });
      }
      setShowModal(false);
      setForm(emptyCoupon);
      setEditingId(null);
      fetchCoupons();
    } catch {
      setError("İşlem başarısız oldu.");
    }
  };

  // Kupon düzenle
  const handleEdit = (coupon) => {
    setForm({
      discountRate: coupon.discountRate,
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "",
      code: coupon.code || "",
      senderUserId: coupon.senderUserId || "",
      receiverUserId: coupon.receiverUserId || "",
    });
    setEditingId(coupon.id);
    setShowModal(true);
    setError("");
  };

  // Kupon sil
  const handleDelete = async (id) => {
    if (window.confirm("Kupon silinsin mi?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Coupon/${id}`);
        fetchCoupons();
      } catch {
        alert("Silinemedi!");
      }
    }
  };

  // Modal aç
  const handleAdd = () => {
    setForm(emptyCoupon);
    setEditingId(null);
    setShowModal(true);
    setError("");
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "2rem" }}>
      <h1>Kampanya Kuponları Yönetimi</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          background: "#c2185b",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
        }}
      >
        Yeni Kupon Ekle
      </button>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f4ff" }}>
              <th>ID</th>
              <th>Kod</th>
              <th>İndirim (%)</th>
              <th>Bitiş Tarihi</th>
              <th>Oluşturan</th>
              <th>Alıcı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Kupon yok
                </td>
              </tr>
            )}
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                <td>{coupon.code}</td>
                <td>{coupon.discountRate}</td>
                <td>
                  {coupon.expiryDate ? coupon.expiryDate.split("T")[0] : ""}
                </td>
                <td>{coupon.senderUserId}</td>
                <td>{coupon.receiverUserId}</td>
                <td>
                  <button
                    onClick={() => handleEdit(coupon)}
                    style={{ marginRight: 8 }}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    style={{
                      color: "white",
                      background: "#d32f2f",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                    }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal"
            style={{
              background: "white",
              padding: 32,
              borderRadius: 16,
              minWidth: 350,
              maxWidth: 400,
              boxShadow: "0 8px 32px 0 rgba(106,17,203,0.14)",
            }}
          >
            <h2>{editingId ? "Kuponu Düzenle" : "Yeni Kupon Ekle"}</h2>
            {error && (
              <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label>İndirim Oranı (%):</label>
                <input
                  type="number"
                  name="discountRate"
                  min="1"
                  max="100"
                  value={form.discountRate}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Bitiş Tarihi:</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#c2185b",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                {editingId ? "Kaydet" : "Ekle"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  width: "100%",
                  marginTop: 8,
                  background: "#aaa",
                  color: "white",
                  padding: "8px",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                Vazgeç
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKampanya;
