import express from "express";
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from "./controlers.js";

const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", createClient);
router.get("/clients/:id", getClientById);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
