import Client from "./models/Client.js";

export async function getClients(req, res) {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createClient(req, res) {
  const { name, surname, email, phone, registerDate } = req.body;

  if (!name || !surname || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newClient = new Client({
      name,
      surname,
      email,
      phone,
      registerDate,
    });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getClientById(req, res) {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateClient(req, res) {
  const { id } = req.params;
  const { name, surname, email, phone, registerDate } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    client.name = name || client.name;
    client.surname = surname || client.surname;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.registerDate = registerDate || client.registerDate;

    await client.save();

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteClient(req, res) {
  const { id } = req.params;
  try {
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
