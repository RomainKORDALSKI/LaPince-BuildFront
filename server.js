import express from "express";
import { sequelize } from "./models/dbClientSequelize.js";
import utilisateurRoutes from "./routes/utilisateurRoutes.js";
import compteRoutes from "./routes/compteRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import "./models/index.js"; // Assure que les associations sont chargées

const app = express();
app.use(express.json());

// Utiliser les routes
app.use("/utilisateurs", utilisateurRoutes);
app.use("/comptes", compteRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categorieRoutes);

// Synchroniser les modèles et démarrer le serveur
app.listen(3000, async () => {
  try {
    await sequelize.sync({ alter: true }); // Synchroniser les modèles avec la base de données
    console.log("Serveur démarré sur le port 3000");
  } catch (error) {
    console.error("Impossible de démarrer le serveur : ", error);
  }
});
