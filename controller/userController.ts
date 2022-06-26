import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../service/userService";

export default class UserController {
  static create = async (req: Request, res: Response) => {
    let bodyData = req.body;
    let response = await UserService.inputData(bodyData);
    return res.status(200).json(response);
  };

  static getList = async (req: Request, res: Response) => {
    let storedId = res.locals.Id;
    if (storedId) {
      let id: any = req.query.Id;
      let name: any = req.query.Name;
      let email: any = req.query.Email;
      let roleId: any = req.query.RoleId;
      let response = await UserService.getAllData(id, name, email, roleId);
      return res.status(200).json(response);
    } else {
      return res
        .status(200)
        .json({ message: "You can not get all data because you are customer" });
    }
  };

  static getListById = async (req: Request, res: Response) => {
    let storedId = res.locals.Id;
    let id: any = req.params.Id;
    if (storedId) {
      let response = await UserService.getDataById(id);
      return res.status(200).json(response);
    } else {
      let authorizationToken: any = req.get("authorization");
      let token: string = authorizationToken.split(" ")[1];
      let decode: any = jwt.decode(token);
      if (id == decode.Id) {
        let response = await UserService.getDataById(id);
        return res.status(200).json(response);
      } else {
        return res.status(200).json({ message: "User not found" });
      }
    }
  };

  static update = async (req: Request, res: Response) => {
    let storedId = res.locals.Id;
    let bodyData = req.body;
    if (storedId) {
      let response = await UserService.updateData(bodyData);
      return res.status(200).json(response);
    } else {
      return res
        .status(200)
        .json({ message: "You can not update data because you are customer" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    let storedId = res.locals.Id;
    let id: any = req.params.Id;
    if (storedId) {
      let response = await UserService.deleteData(id);
      return res.status(200).json(response);
    } else {
      return res
        .status(200)
        .json({ message: "You can not delete data because you are customer" });
    }
  };

  static login = async (req: Request, res: Response) => {
    let email: string = req.body.Email;
    let password: string = req.body.Password;
    let response = await UserService.loginData(email, password);
    return res.status(200).json(response);
  };

  static getRoleByUserById = async (req: Request, res: Response) => {
    let id: any = req.params.Id;
    let response = await UserService.getRoleData(id);
    return res.status(200).json(response);
  };

  static getRoleByUserToken = async (req: Request, res: Response) => {
    let authorizationToken: any = req.get("authorization");
    let token: string = authorizationToken.split(" ")[1];
    let decode: any = jwt.decode(token);
    let response = await UserService.getRoleByToken(decode.Id);
    return res.status(200).json(response);
  };
}
