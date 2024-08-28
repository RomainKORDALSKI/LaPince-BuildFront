import express from "express";
import { Utilisateur } from "../models/Utilisateur.js";

const router = express.Router();

// Créer un nouvel utilisateur
router.post("/", async (req, res) => {
  try {
    const utilisateur = await Utilisateur.create(req.body);
    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.json(utilisateurs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
