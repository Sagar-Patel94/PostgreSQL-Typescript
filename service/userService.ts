import UserRepository from "../repository/userRepository";

export default class UserService extends UserRepository {
  static inputData = async (userData: any) => {
    let data = await UserRepository.createData(userData);
    let response = {
      status : 200,
      message : "",
      data: data,
    };
    return response;
  };

  static getAllData = async (
    id: number,
    name: string,
    email: string,
    roleId: number
  ) => {
    let response = {};
    if (id || name || email || roleId) {
      let data = await UserRepository.getQuery(id, name, email, roleId);
      response = {
        data: data,
      };
    } else {
      let data = await UserRepository.getAll();
      response = {
        data: data,
      };
    }
    return response;
  };

  static getDataById = async (userId: number) => {
    let response = {};
    let data = await UserRepository.getById(userId);
    response = {
      data: data,
    };
    return response;
  };

  static updateData = async (userUpdateData: any) => {
    let data = await UserRepository.updt(userUpdateData);
    let response = {
      data: data,
    };
    return response;
  };

  static deleteData = async (userId: number) => {
    let response = {};
    let data = await UserRepository.delData(userId);
    response = {
      data: data,
    };
    return response;
  };

  static loginData = async (userEmail: string, userPassword: string) => {
    let response = {};
    let data = await UserRepository.userLogin(userEmail, userPassword);
    response = {
      data: data,
    };
    return response;
  };

  static getRoleData = async (userId: number) => {
    let response = {};
    let data = await UserRepository.roleData(userId);
    response = {
      data: data,
    };
    return response;
  };

  static getRoleByToken = async (userId: number) => {
    let response = {};
    let data = await UserRepository.roleByToken(userId);
    response = {
      data: data,
    };
    return response;
  };
}
