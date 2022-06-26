import Grocery from "../models/grocery";

export default class GroceryRepo {
  static async createData(groceryTerm: string, groceryDefination: string) {
    let data = await Grocery.create({
      Term: groceryTerm,
      Defination: groceryDefination,
    });
    let response = {
      data: data,
    };
    return response;
  }

  static async getAll() {
    let data = await Grocery.findAll();
    let response = {
      data: data,
    };
    return response;
  }

  static async getById(groceryId: number) {
    let data = await Grocery.findByPk(groceryId);
    let response = {
      data: data,
    };
    return response;
  }

  static async updtData(
    groceryId: number,
    groceryTerm: string,
    groceryDefination: string
  ) {
    await Grocery.update(
      {
        Term: groceryTerm,
        Defination: groceryDefination,
      },
      {
        where: { Id: groceryId },
      }
    );
    let response = {
      Message: "Data successfully updated",
    };
    return response;
  }

  static async delData(groceryId: number) {
    await Grocery.destroy({ where: { Id: groceryId } });
    let response = {
      Message: "Data successfully deleted",
    };
    return response;
  }
}
