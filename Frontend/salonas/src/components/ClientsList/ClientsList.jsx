import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClientsList.module.css";

const endpoint = "http://localhost:3001/clients";
export default function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.container}>
      <h1>Klientai</h1>
      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavarde</th>
            <th>El. pastas</th>
            <th>Telefonas</th>
            <th>Data</th>
            <th>Laikas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.surname}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>

              <td>{new Date(client.registerDate).toLocaleDateString()}</td>
              <td>
                {new Date(client.registerDate).toLocaleTimeString(
                  navigator.language,
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </td>
              <td className={styles.buttons}>
                <button>Keisti</button>
                <button>Trinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
