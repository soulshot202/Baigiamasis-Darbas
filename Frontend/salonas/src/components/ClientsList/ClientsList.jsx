import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClientsList.module.css";
import UpdateClient from "../UpdateClient/UpdateClient";

const endpoint = "http://localhost:3001/clients";
export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("655e5ec1e47b56485e85a862");
  const [order, setOrder] = useState("asc");

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
      <UpdateClient
        isOpen={isOpen}
        setClients={setClients}
        id={id}
        onClose={() => setIsOpen(false)}
      />
      <h1>Klientai</h1>
      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th
              title="rikiuoti pagal pavardę"
              className={styles.surname}
              onClick={() => {
                if (order === "asc") {
                  const sortedClients = [...clients].sort((a, b) =>
                    a.surname.localeCompare(b.surname)
                  );
                  setClients(sortedClients);
                  setOrder("desc");
                  return;
                } else {
                  const sortedClients = [...clients].sort((a, b) =>
                    b.surname.localeCompare(a.surname)
                  );
                  setClients(sortedClients);
                  setOrder("asc");
                  return;
                }
              }}>
              Pavardė <i class="fa-solid fa-sort"></i>
            </th>
            <th>El. paštas</th>
            <th>Telefonas</th>
            <th
              title="rikiuoti pagal datą"
              className={styles.date}
              onClick={() => {
                if (order === "asc") {
                  const sortedClients = [...clients].sort(
                    (a, b) =>
                      new Date(a.registerDate) - new Date(b.registerDate)
                  );
                  setClients(sortedClients);
                  setOrder("desc");
                  return;
                } else {
                  const sortedClients = [...clients].sort(
                    (a, b) =>
                      new Date(b.registerDate) - new Date(a.registerDate)
                  );
                  setClients(sortedClients);
                  setOrder("asc");
                  return;
                }
              }}>
              Data <i class="fa-solid fa-sort"></i>
            </th>
            <th>Laikas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.surname}</td>
              <td>{client.email}</td>
              <td>
                {client.phone.slice(0, 4) +
                  " " +
                  client.phone.slice(4, 7) +
                  " " +
                  client.phone.slice(7)}
              </td>

              <td>{new Date(client.registerDate).toLocaleDateString()}</td>
              <td>
                {new Date(client.registerDate).toLocaleTimeString(
                  navigator.language,
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </td>
              <td className={styles.buttons}>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setId(client._id);
                  }}>
                  Redaguoti
                </button>

                <button
                  onClick={async () => {
                    if (!window.confirm("Ar tikrai norite ištrinti klienta?")) {
                      return;
                    }
                    await axios
                      .delete(`${endpoint}/${client._id}`)
                      .then(() => {
                        setClients((prev) =>
                          prev.filter((p) => p._id !== client._id)
                        );
                        alert("Klientas sėkmingai ištrintas");
                      })
                      .catch((error) => {
                        console.log(error);

                        alert("Nepavyko ištrinti kliento");
                      });
                  }}>
                  Trinti
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
