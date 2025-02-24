import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Hospitals = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function
  const { token } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/hospitals", { headers: { token } })
      .then((response) => {
        setAdmins(response.data.hospitals);
      })
      .catch((error) => {
        console.error("There was an error fetching the admins!", error);
      });
  }, []);

  const handleRedirect = (adminId) => {
    navigate(`/hospital/${adminId}`); // Redirect to the specific hospital page
  };

  return (
    <div>
      <h1>Hospital Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li 
            key={admin._id} 
            onClick={() => handleRedirect(admin._id)} 
            style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd", marginBottom: "10px" }}
          >
            <strong>{admin.hospitalName}</strong><br />
            <strong>{admin.address}</strong><br />
            <strong>{admin.phone}</strong><br />
            <strong>{admin.description}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
