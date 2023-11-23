import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy; 2023</p>

      <p>MB "Grožio studija", Kauno g. 15, Klaipėda, Tel. +370 123 45678</p>
    </footer>
  );
}
