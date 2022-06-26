import { Sequelize, DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConn/conn";
import user from "../models/user";

class role extends Model {
  Id: any;
  UserId: any;
  Name: any;
  static Id: number;
}

role.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "role",
  }
);

// role.drop();

role.hasMany(user, {foreignKey: "RoleId"});
user.belongsTo(role, {foreignKey: "RoleId"});

export default role;