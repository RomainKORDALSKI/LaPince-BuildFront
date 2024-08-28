import { DataTypes, Model } from "sequelize";
import { sequelize } from "./dbClientSequelize.js";

export class Categorie extends Model {}

Categorie.init(
  {
    Nom_Categorie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type_Categorie: {
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
    tableName: "categorie",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
