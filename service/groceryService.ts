import GroceryRepository from "../repository/groceryRepository";

export default class GroceryService extends GroceryRepository {
  static inputData = async (groceryTerm: string, groceryDefination: string) => {
    let response = {};
    let data = await GroceryRepository.createData(
      groceryTerm,
      groceryDefination
    );
    response = {
      data: data,
    };
    return response;
  };

  static getAllData = async () => {
    let response = {};
    let data = await GroceryRepository.getAll();
    response = {
      data: data,
    };
    return response;
  };

  static getDataById = async (groceryId: number) => {
    let response = {};
    let data = await GroceryRepository.getById(groceryId);
    response = {
      data: data,
    };
    return response;
  };

  static updateData = async (
    groceryId: number,
    groceryTerm: string,
    groceryDefination: string
  ) => {
    let response = {};
    let data = await GroceryRepository.updtData(
      groceryId,
      groceryTerm,
      groceryDefination
    );
    response = {
      data: data,
    };
    return response;
  };

  static deleteData = async (groceryId: number) => {
    let response = {};
    let data = await GroceryRepository.delData(groceryId);
    response = {
      data: data,
    };
    return response;
  };
}
