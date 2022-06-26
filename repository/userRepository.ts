import user from "../models/user";
import Bcrypt from "bcrypt";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import role from "../models/role";

let sm = user.findAll()
console.log(sm, "+++++++++++++++++++++++++");

export default class UserRepo {
  static async createData(userData: any) {
    let password = userData.Password;
    const salt = await Bcrypt.genSalt(10);
    password = await Bcrypt.hash(password, salt);
    return user.create({
      RoleId: userData.RoleId,
      Name: userData.Name,
      Email: userData.Email,
      Password: password,
    });
  }

  static getAll() {
    return user.findAll();
  }

  static getQuery(id: number, name: string, email: string, roleId: number) {
    if (roleId < 0 || roleId == undefined) {
      roleId = 0;
    }
    return user.findAll({
      where: {
        [Op.or]: [
          { Name: { [Op.like]: "%" + name + "%" } },
          { Email: { [Op.like]: "%" + email + "%" } },
          { RoleId: roleId },
        ],
      },
    });
  }

  static async getById(userId: number) {
    let response = {};
    await user
      .findByPk(userId)
      .then(async (data) => {
        if (data != null) {
          let idData = await user.findByPk(userId);
          response = {
            dta: idData,
          };
        } else {
          response = {
            Message: "User not found",
          };
        }
      })
      .catch((err) => {
        response = {
          Error: err,
        };
      });
    return response;
  }

  static async updt(userUpdateData: any) {
    let password = userUpdateData.Password;
    const salt = await Bcrypt.genSalt(10);
    password = await Bcrypt.hash(password, salt);
    await user.update(
      {
        RoleId: userUpdateData.RoleId,
        Name: userUpdateData.Name,
        Email: userUpdateData.Email,
        Password: password,
      },
      {
        where: { Id: userUpdateData.Id },
      }
    );
    let response = {
      Message: "Data successfully updated",
    };
    return response;
  }

  static async delData(userId: number) {
    let response = {};
    await user
      .findByPk(userId)
      .then(async (data) => {
        if (data != null) {
          await user.destroy({ where: { Id: userId } });
          response = {
            Message: "Data successfully deleted",
          };
        } else {
          response = {
            message: "User not found",
          };
        }
      })
      .catch((err) => {
        response = {
          Error: err,
        };
      });
    return response;
  }

  static async userLogin(userEmail: string, userPassword: string) {
    let token = "";
    let response = {};
    await user
      .findOne({
        where: {
          Email: userEmail,
        },
      })
      .then(async (data) => {
        if (userEmail == "" && userPassword == "") {
          response = {
            message: "Please enter email and password",
          };
        } else if (userPassword == "") {
          response = {
            message: "Please enter password",
          };
        } else if (userEmail == "") {
          response = {
            message: "Please enter email",
          };
        } else if (data) {
          const hashPassword = data.Password;
          await Bcrypt.compare(userPassword, hashPassword)
            .then((result) => {
              if (result) {
                token = jwt.sign(
                  {
                    Id: data.Id,
                    RoleId: data.RoleId,
                    Name: data.Name,
                    Email: data.Email,
                    Password: data.Password,
                  },
                  "secret"
                );
                response = {
                  message: "Login successfull",
                  UserToken: token,
                  UserData: {
                    Id: data.Id,
                    RoleId: data.RoleId,
                    Name: data.Name,
                  },
                };
              } else {
                response = {
                  message: "Password is incorrect",
                };
              }
            })
            .catch((err) => {
              console.log(err, "=== err ===");
            });
        } else {
          response = {
            message: "Invalid email",
          };
        }
      })
      .catch((error) => {
        console.error(error, "error+++");
      });
    return response;
  }

  static async roleData(userId: number) {
    let data = await user.findByPk(userId, {
      attributes: ["Id", "RoleId", "Name"],
      include: [
        {
          model: role,
          attributes: ["Id", "Name"],
        },
      ],
    });
    return data;
  }

  static async roleByToken(userId: number) {
    let data = await user.findByPk(userId, {
      attributes: ["Name"],
      include: [
        {
          model: role,
          attributes: ["Name"],
        },
      ],
    });
    let response = {
      message: "Token is valid",
      User_Id: userId,
      data: data,
    };
    return response;
  }
}
