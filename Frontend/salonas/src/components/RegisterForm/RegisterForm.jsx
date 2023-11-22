import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const endpoint = "http://localhost:3001/clients";
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registerDate, setRegisterDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newClient = {
      name,
      surname,
      email,
      phone,
      registerDate,
    };
    axios
      .post(endpoint, newClient)
      .then((response) => {
        console.log(response.data);
        alert("Registracija sėkminga");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Vardas:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="surname">Pavarde:</label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <label htmlFor="email">El. pastas:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="phone">Telefono numeris:</label>
      <input
        type="text"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label htmlFor="registerDate">Registracijos data:</label>
      <input
        type="datetime-local"
        id="registerDate"
        value={registerDate}
        onChange={(e) => setRegisterDate(e.target.value)}
      />
      <button type="submit">Registruoti</button>
    </form>
  );
}
