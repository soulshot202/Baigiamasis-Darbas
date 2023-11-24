import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClientsList.module.css";
import UpdateClient from "../UpdateClient/UpdateClient";

const endpoint = "http://localhost:3001/clients";
export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("655e5ec1e47b56485e85a862");

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
  // async function deleteClient() {
  //   try {
  //     await axios.delete(`${endpoint}/${client._id}`);
  //     // setClients((prev) => prev.filter((p) => p._id !== clients._id));

  //     alert("Klientas sėkmingai ištrintas");
  //   } catch (error) {
  //     console.log(error);
  //     console.log(id);
  //     alert("Nepavyko ištrinti kliento");
  //   }
  // }
  return (
    <div className={styles.container}>
      <UpdateClient isOpen={isOpen} id={id} onClose={() => setIsOpen(false)} />
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
            <tr key={client._id}>
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
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setId(client._id);
                  }}>
                  Redaguoti
                </button>

                <button
                  onClick={async () => {
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
