import express from "express";
import { Transaction } from "../models/Transaction.js";
import { Compte } from "../models/Compte.js";

const router = express.Router();

// Créer une nouvelle transaction
router.post("/", async (req, res) => {
  const {
    Montant,
    Date_Transaction,
    Type_Transaction,
    Description,
    ID_Compte,
    ID_Categorie,
  } = req.body;

  try {
    const compte = await Compte.findByPk(ID_Compte);
    if (!compte) {
      return res.status(404).json({ error: "Compte non trouvé" });
    }

    // Convertir Solde_initial en nombre pour s'assurer que les opérations arithmétiques fonctionnent correctement
    let soldeActuel = parseFloat(compte.Solde_initial);

    if (Type_Transaction === "credit") {
      soldeActuel += parseFloat(Montant);
    } else if (Type_Transaction === "debit") {
      soldeActuel -= parseFloat(Montant);
    }

    // Mettre à jour le solde du compte
    compte.Solde_initial = soldeActuel.toFixed(2); // Assurez-vous que le solde est correctement formaté
    await compte.save();

    // Créer la transaction après avoir mis à jour le solde
    const transaction = await Transaction.create({
      Montant,
      Date_Transaction,
      Type_Transaction,
      Description,
      ID_Compte,
      ID_Categorie,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la création de la transaction",
    });
  }
});

// Récupérer toutes les transactions d'un compte
router.get("/:id_compte", async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { ID_Compte: req.params.id_compte },
    });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer les dernières transactions (par exemple, les 10 dernières)
router.get("/dernieres/:id_compte", async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { ID_Compte: req.params.id_compte },
      order: [["Date_Transaction", "DESC"]],
      limit: 10,
    });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
