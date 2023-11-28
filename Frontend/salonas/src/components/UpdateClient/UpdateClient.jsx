import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./UpdateClient.module.css";
import { createPortal } from "react-dom";
import { validEmail } from "../../regex/regex";
export default function UpdateClient({ isOpen, onClose, id, setClients }) {
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
        setRegisterTime(
          new Date(response.data.registerDate).toLocaleTimeString(
            navigator.language,
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !name ||
      !surname ||
      !email ||
      !phone ||
      !registerDate ||
      !registerTime
    ) {
      alert("Užpildykite visus laukus");
      return;
    }
    if (name.length > 25 || name.length < 3) {
      alert("Vardas turi būti ne daugiau nei 25 simbolių ir ne mažiau nei 3");
      return;
    }
    if (surname.length > 25 || surname.length < 3) {
      alert("Pavardė turi būti ne daugiau nei 25 simbolių ir ne mažiau nei 3");
      return;
    }
    if (name[0] < `A` || name[0] > `Ž`) {
      alert("Vardas turi prasidėti didžiaja raide");
      return;
    }

    if (surname[0] < `A` || surname[0] > `Ž`) {
      alert("Pavardės turi prasidėti didžiaja raide");
      return;
    }

    if (!validEmail.test(email)) {
      return alert("Neteisingas el. paštas");
    }

    if (!phone.startsWith("+370")) {
      alert("Telefono numeris turi prasidėti +370");
      return;
    }
    if (phone.length !== 12) {
      alert("Neteisingas telefonas");
      return;
    }
    if (registerDate < new Date().toISOString().slice(0, 10)) {
      alert("Registracijos data negali buti ankstesnė už dabartinę");
      return;
    }

    const editClient = {
      name,
      surname,
      email,
      phone,
      registerDate: registerDate.slice(0, 10) + " " + registerTime,
    };
    try {
      await axios.put(`${endpoint}/${id}`, editClient);
      setClients((prevClients) => {
        return prevClients.map((client) => {
          if (client._id === id) {
            return editClient;
          }
          return client;
        });
      });

      alert("Klientas atnaujintas");
      onClose();
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.container2}>
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
            min={new Date().toISOString().slice(0, 10)}
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
