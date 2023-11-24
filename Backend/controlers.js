import Client from "./models/Client.js";

export async function getClients(req, res) {
  try {
    const clients = await Client.find();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function createClient(req, res) {
  const { name, surname, email, phone, registerDate } = req.body;

  if (!name || !surname || !email || !phone) {
    return res.status(400).json({ error: "Visi laukai privalomi" });
  }
  if (name.length < 3 || name.length > 25) {
    return res
      .status(400)
      .json({ error: "Vardas privalo buti nuo 3 iki 25 simboliu" });
  }
  if (surname.length < 3 || surname.length > 25) {
    return res
      .status(400)
      .json({ error: "Pavarde privalo buti nuo 3 iki 25 simboliu" });
  }
  if (email.length < 6 || email.length > 55) {
    return res
      .status(400)
      .json({ error: "El. paštas privalo buti nuo 6 iki 55 simboliu" });
  }
  if (phone.length !== 12) {
    return res
      .status(400)
      .json({ error: "Telefono numeris privalo buti 12 simboliu" });
  }
  if (!registerDate) {
    return res
      .status(400)
      .json({ error: "Registracijos data privalo buti uzpildyta" });
  }
  if (registerDate < new Date().toISOString().slice(0, 10)) {
    return res
      .status(400)
      .json({ error: "Registracijos data negali buti ankstesne uz dabartine" });
  }
  if (
    !phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  ) {
    return res.status(400).json({ error: "Neteisingas telefonas" });
  }
  if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return res.status(400).json({ error: "Neteisingas el. paštas" });
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
      return res.status(404).json({ error: "Klientas nerastas" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateClient(req, res) {
  const { id } = req.params;
  const { name, surname, email, phone, registerDate } = req.body;
  if (!name || !surname || !email || !phone || !registerDate) {
    return res.status(400).json({ error: "Visi laukai privalomi" });
  }

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "Klientas nerastas" });
    }
    if (name.length < 3 || name.length > 25) {
      return res
        .status(400)
        .json({ error: "Vardas privalo buti nuo 3 iki 25 simboliu" });
    }
    if (surname.length < 3 || surname.length > 25) {
      return res
        .status(400)
        .json({ error: "Pavardė privalo buti nuo 3 iki 25 simboliu" });
    }
    if (email.length < 6 || email.length > 55) {
      return res
        .status(400)
        .json({ error: "El. paštas privalo buti nuo 6 iki 55 simboliu" });
    }
    if (phone.length !== 12) {
      return res
        .status(400)
        .json({ error: "Telefono numeris privalo buti 12 simboliu" });
    }
    if (!registerDate) {
      return res
        .status(400)
        .json({ error: "Registracijos data privalo buti uzpildyta" });
    }
    if (registerDate < new Date().toISOString().slice(0, 10)) {
      return res.status(400).json({
        error: "Registracijos data negali buti ankstesne uz dabartine",
      });
    }
    if (
      !phone.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    ) {
      return res.status(400).json({ error: "Neteisingas telefonas" });
    }
    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      return res.status(400).json({ error: "Neteisingas el. paštas" });
    }

    ///
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
      return res.status(404).json({ error: "Klientas nerastas" });
    }
    res.status(200).json({ message: "Klientas pasalintas" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
