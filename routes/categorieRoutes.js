import express from "express";
import { Categorie } from "../models/Categorie.js";

const router = express.Router();

// Créer une nouvelle catégorie
router.post("/", async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les catégories
router.get("/", async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
