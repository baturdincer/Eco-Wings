// import React, { useState } from "react";
// import axios from "axios";
// import "./editProfilebutton.css";

// // yapım aşamasında !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const EditProfileButton = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "John Doe",
//     phone: "+123 456 7890",
//     email: "johndoe@gmail.com",
//   });

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSaveClick = async () => {
//     try {
//       // Backend API'ye istek gönder(kendimizinki olusunca buraya yaz ve guncelle!!!!!!!!!!!!!!!!!!!!!!!!!!)
//       await axios.put("https://your-backend-api.com/update-profile", userData);

//       alert("Profile updated successfully!");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="edit-profile-container">
//       {isEditing ? (
//         <div className="edit-form">
//           <input
//             type="text"
//             name="name"
//             value={userData.name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="phone"
//             value={userData.phone}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//           />
//           <button className="save-button" onClick={handleSaveClick}>
//             Save
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p>
//             <strong>Name:</strong> {userData.name}
//           </p>
//           <p>
//             <strong>Phone:</strong> {userData.phone}
//           </p>
//           <p>
//             <strong>Email:</strong> {userData.email}
//           </p>
//           <button className="edit-button" onClick={handleEditClick}>
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProfileButton;
