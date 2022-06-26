import { Request, Response } from "express";
import RoleService from "../service/roleService";

export default class roleController {
  static create = async (req: Request, res: Response) => {
    let name = req.body.Name;
    let response = await RoleService.inputData(name);
    return res.status(200).json(response);
  };

  static getList = async (req: Request, res: Response) => {
    let response = await RoleService.getAllData();
    return res.status(200).json(response);
  };

  static getUserByRoleById = async (req: Request, res: Response) => {
    let id: any = req.params.Id;
    let response = await RoleService.getUserData(id);
    return res.status(200).json(response);
  };
}
