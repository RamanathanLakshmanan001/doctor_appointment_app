import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { AppContext } from '../context/AppContext'
const Hospitals = () => {
  const [admins, setAdmins] = useState([]);
     const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
  useEffect(() => {
    // Fetch admins from the backend when the component mounts
    axios
      .get("http://localhost:4000/api/user/hospitals", { headers: { token } })
      .then((response) => {
        console.log(response.data.hospitals)
        setAdmins(response.data.hospitals); // Save the data in state
      })
      .catch((error) => {
        console.error("There was an error fetching the admins!", error);
      });
  }, []);
console.log(admins)
  return (
    <div>
      <h1>Hospital Admins</h1>
      <ul>
      {admins.map((admin) => (
          <li key={admin._id}>
            <strong>{admin.hospitalName}</strong>
            <strong>{admin.address}</strong>
            <strong>{admin.phone}</strong>
            <strong>{admin.description}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
