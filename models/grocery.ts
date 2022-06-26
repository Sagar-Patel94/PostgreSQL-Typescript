import { Sequelize, DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConn/conn";

class Grocery extends Model {
  Id!: number;
  Term!: string;
  Defination!: string;
  static Id: number;
}

Grocery.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Term: {
      type: DataTypes.STRING,
    },
    Defination: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "grocery",
  }
);

export default Grocery;
