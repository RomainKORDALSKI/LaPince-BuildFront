import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://lapince:lapince@localhost:5432/lapince2",
  {
    dialect: "postgres",
    logging: false, // Optionnel : pour désactiver les logs de requêtes
  }
);
