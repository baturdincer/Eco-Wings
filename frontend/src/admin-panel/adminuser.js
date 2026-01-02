// src/admin-panel/AdminUser.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyUser = {
  name: "",
  email: "",
  passwordPlain: "",
  role: 0,
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
};

const ROLES = [
  { value: 0, label: "Kullanıcı" },
  { value: 1, label: "Temsilci" },
  { value: 2, label: "Admin" },
];

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Kullanıcıları çek
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5000/api/User");
      setUsers(res.data);
    } catch (err) {
      setError("Kullanıcılar yüklenemedi.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form değerleri değişince
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Yeni kullanıcı ekle veya var olanı güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.passwordPlain) {
      setError("İsim, email ve şifre boş olamaz.");
      return;
    }

    try {
      if (editingId) {
        // Güncelle (PUT)
        await axios.put(`https://localhost:5000/api/User/${editingId}`, {
          id: editingId,
          ...form,
        });
      } else {
        // Ekle (POST)
        await axios.post("https://localhost:5000/api/User", form);
      }
      setShowModal(false);
      setForm(emptyUser);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError("İşlem başarısız.");
    }
  };

  // Kullanıcı düzenle
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      passwordPlain: "",
      role: user.role,
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      gender: user.gender,
      phoneNumber: user.phoneNumber,
    });
    setEditingId(user.id);
    setShowModal(true);
    setError("");
  };

  // Kullanıcı sil
  const handleDelete = async (id) => {
    if (window.confirm("Kullanıcı silinsin mi?")) {
      try {
        await axios.delete(`https://localhost:5000/api/User/${id}`);
        fetchUsers();
      } catch (err) {
        alert("Silinemedi!");
      }
    }
  };

  // Yeni kullanıcı ekleme için modalı aç
  const handleAdd = () => {
    setForm(emptyUser);
    setEditingId(null);
    setShowModal(true);
    setError("");
  };

  return (
    <div
      className="admin-user-container"
      style={{ maxWidth: 900, margin: "auto", padding: "2rem" }}
    >
      <h1>Kullanıcı Yönetimi</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: 16,
          background: "#6a1b9a",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
        }}
      >
        Yeni Kullanıcı Ekle
      </button>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f2e7fa" }}>
              <th>ID</th>
              <th>İsim</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Doğum Tarihi</th>
              <th>Cinsiyet</th>
              <th>Telefon</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  Kullanıcı yok
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {ROLES.find((r) => r.value === user.role)?.label || user.role}
                </td>
                <td>
                  {user.dateOfBirth ? user.dateOfBirth.split("T")[0] : ""}
                </td>
                <td>{user.gender}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{ marginRight: 8 }}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
            background: "rgba(0,0,0,0.15)",
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
            <h2>{editingId ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}</h2>
            {error && (
              <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 10 }}>
                <label>İsim:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
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
              <div style={{ marginBottom: 10 }}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
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
              <div style={{ marginBottom: 10 }}>
                <label>Şifre:</label>
                <input
                  type="password"
                  name="passwordPlain"
                  value={form.passwordPlain}
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
              <div style={{ marginBottom: 10 }}>
                <label>Rol:</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Doğum Tarihi:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
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
              <div style={{ marginBottom: 10 }}>
                <label>Cinsiyet:</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: 7,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                >
                  <option value="">Seçiniz</option>
                  <option value="Male">Erkek</option>
                  <option value="Female">Kadın</option>
                  <option value="Other">Diğer</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Telefon:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
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
                  background: "#6a1b9a",
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

export default AdminUser;
