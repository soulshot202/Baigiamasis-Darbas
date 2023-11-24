import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./UpdateClient.module.css";
import { createPortal } from "react-dom";
export default function UpdateClient({ isOpen, onClose, id }) {
  const endpoint = "http://localhost:3001/clients";
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [registerTime, setRegisterTime] = useState("");

  useEffect(() => {
    axios
      .get(`${endpoint}/${id}`)
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setRegisterDate(response.data.registerDate.slice(0, 10));
        setRegisterTime(response.data.registerDate.slice(11, 19));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newClient = {
      name,
      surname,
      email,
      phone,
      registerDate: registerDate.slice(0, 10) + " " + registerTime,
    };
    axios.put(`${endpoint}/${id}`, newClient);
  };

  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.updform}>
        <label htmlFor="name">Vardas:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surname">Pavardė:</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="email">El. paštas:</label>
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
        <label htmlFor="registerDate">Registracijos data ir laikas:</label>
        <div className={styles.regdate}>
          <input
            type="date"
            id="registerDate"
            value={registerDate}
            onChange={(e) => setRegisterDate(e.target.value)}
          />
          <select
            id="registerTime"
            value={registerTime}
            onChange={(e) => setRegisterTime(e.target.value)}>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16:00">16:00</option>
          </select>
        </div>
        <div className={styles.buttons}>
          {" "}
          <button type="submit">Atnaujinti</button>
          <button type="button" onClick={onClose}>
            Atšaukti
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}
