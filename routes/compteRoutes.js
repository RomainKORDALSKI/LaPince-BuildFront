import express from "express";
import { Compte } from "../models/Compte.js";

const router = express.Router();

// Créer un nouveau compte
router.post("/", async (req, res) => {
  try {
    const compte = await Compte.create(req.body);
    res.status(201).json(compte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les comptes d'un utilisateur
router.get("/:id_utilisateur", async (req, res) => {
  try {
    const comptes = await Compte.findAll({
      where: { ID_Utilisateur: req.params.id_utilisateur },
    });
    res.json(comptes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer le solde d'un compte
router.get("/solde/:id_compte", async (req, res) => {
  try {
    const compte = await Compte.findByPk(req.params.id_compte);
    if (compte) {
      res.json({ solde_initial: compte.Solde_initial });
    } else {
      res.status(404).json({ error: "Compte non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
