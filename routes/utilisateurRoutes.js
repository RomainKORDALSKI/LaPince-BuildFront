import express from "express";
import { Utilisateur } from "../models/Utilisateur.js";
import { Compte } from "../models/Compte.js";
import { Transaction } from "../models/Transaction.js";

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

// Récupérer le compte d'un utilisateur avec son solde et ses transactions
router.get("/:utilisateurId/compte/:compteId", async (req, res) => {
  const { utilisateurId, compteId } = req.params;

  try {
    // Récupérer le compte avec les transactions associées
    const compte = await Compte.findOne({
      where: {
        id: compteId,
        ID_Utilisateur: utilisateurId,
      },
      include: [
        {
          model: Transaction,
          as: "transactions", // Alias utilisé dans l'association
        },
      ],
    });

    if (!compte) {
      return res
        .status(404)
        .json({ error: "Compte non trouvé pour cet utilisateur" });
    }

    res.json(compte);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération du compte",
    });
  }
});

export default router;
