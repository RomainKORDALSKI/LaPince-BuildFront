import { DataTypes, Model } from "sequelize";
import { sequelize } from "./dbClientSequelize.js";

export class Compte extends Model {}

Compte.init(
  {
    Nom_compte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Solde_initial: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Type_compte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "compte",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
