import { Utilisateur } from "./Utilisateur.js";
import { Compte } from "./Compte.js";
import { Transaction } from "./Transaction.js";
import { Categorie } from "./Categorie.js";

// Définir les associations
Utilisateur.hasMany(Compte, { foreignKey: "ID_Utilisateur", as: "comptes" });
Compte.belongsTo(Utilisateur, {
  foreignKey: "ID_Utilisateur",
  as: "utilisateur",
});

Compte.hasMany(Transaction, { foreignKey: "ID_Compte", as: "transactions" });
Transaction.belongsTo(Compte, { foreignKey: "ID_Compte", as: "compte" });

Categorie.hasMany(Transaction, {
  foreignKey: "ID_Categorie",
  as: "transactions",
});
Transaction.belongsTo(Categorie, {
  foreignKey: "ID_Categorie",
  as: "categorie",
});
