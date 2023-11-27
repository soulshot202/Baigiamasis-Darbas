import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.css";
import { validEmail } from "../../regex/regex";

export default function RegisterForm() {
  const endpoint = "http://localhost:3001/clients";
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+370");
  const [registerDate, setRegisterDate] = useState("");
  const [registerTime, setRegisterTime] = useState("09:00");

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
      alert("Vardas turi būti ne daugiau nei 25 simbolių ir ne ilgesnis nei 3");
      return;
    }
    if (surname.length > 25 || surname.length < 3) {
      alert(
        "Pavardės turi būti ne daugiau nei 25 simbolių ir ne ilgesnės nei 3"
      );
      return;
    }
    if (name[0] < `A` || name[0] > `Z`) {
      alert("Vardas turi prasideti didžiaja raide");
      return;
    }

    if (surname[0] < `A` || surname[0] > `Z`) {
      alert("Pavardės turi prasideti didžiaja raide");
      return;
    }

    if (!validEmail.test(email)) {
      return alert("Neteisingas el. paštas");
    }

    if (!phone.startsWith("+370")) {
      alert("Telefono numeris turi prasideti +370");
      return;
    }
    if (phone.length !== 12) {
      alert("Neteisingas telefonas");
      return;
    }
    if (registerDate < new Date().toISOString().slice(0, 10)) {
      alert("Registracijos data negali buti ankstesne uz dabartine");
      return;
    }

    const newClient = {
      name,
      surname,
      email,
      phone,
      registerDate: registerDate.slice(0, 10) + " " + registerTime,
    };
    try {
      await axios.post(endpoint, newClient).then((response) => {
        console.log(response.data);
        alert("Registracija sėkminga");
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setRegisterDate("");
        setRegisterTime("");
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.regform}>
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

        <button type="submit">Registruoti</button>
      </form>
    </div>
  );
}
