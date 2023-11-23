import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="https://i.postimg.cc/BQcQYkW6/logos.png" />

      <div>
        <Link to="/">Klientai</Link>
        <Link to="/register">Registracija</Link>
      </div>
      <div>
        <p>MB "Grožio studija"</p>
        <p>Kauno g. 15, Klaipėda</p>
        <p>Tel. +370 123 45678</p>
      </div>
    </header>
  );
}
