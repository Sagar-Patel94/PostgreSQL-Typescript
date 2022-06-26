import { Sequelize, DataTypes, Model } from "sequelize";
import isEmail from "validator/lib/isEmail";
import sequelizeConnection from "../dbConn/conn";

class user extends Model {
  Id: any;
  RoleId: any;
  Name: any;
  Email: any;
  Password: any;
  static Id: number;
}

user.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "Id",
      },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "user", // We need to choose the model name
  }
);

// user.drop();

export default user;
