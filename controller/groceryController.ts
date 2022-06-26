import { Request, Response } from "express";
import Grocery from "../models/grocery";
import GroceryService from "../service/groceryService";

export default class groceryController {
  static create = async (req: Request, res: Response) => {
    let storedId = res.locals.Id;
    if (storedId) {
      let term: string = req.body.Term;
      let defination: string = req.body.Defination;
      let response = await GroceryService.inputData(term, defination);
      return res.status(200).json(response);
    } else {
      return res
        .status(200)
        .json({ message: "You can not create data because you are customer" });
    }
  };

  static getAllList = async (req: Request, res: Response) => {
    let response = await GroceryService.getAllData();
    return res.status(200).json(response);
  };

  static getListById = async (req: Request, res: Response) => {
    let id: any = req.params.Id;
    let response = await GroceryService.getDataById(id);
    return res.status(200).json(response);
  };

  static update = async (req: Request, res: Response) => {
    let storedId = res.locals.Id;
    if (storedId) {
      let id: number = req.body.Id;
      let term: string = req.body.Term;
      let defination: string = req.body.Defination;
      let response = await GroceryService.updateData(id, term, defination);
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
      let response = await GroceryService.deleteData(id);
      return res.status(200).json(response);
    } else {
      return res
        .status(200)
        .json({ message: "You can not delete data because you are customer" });
    }
    // let storedId = res.locals.Id;
    // if (storedId) {
    //   let id = req.params.Id;
    //   await Grocery.destroy({ where: { Id: id } });
    //   return res.status(200).json({ message: "Data successfully deleted" });
    // } else {
    //   return res
    //     .status(200)
    //     .json({ message: "You can not delete data because you are customer" });
    // }
  };
}
