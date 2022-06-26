import RoleRepository from "../repository/roleRepository";

export default class roleService extends RoleRepository {
  static inputData = async (roleName: string) => {
    let response = {};
    let data = await RoleRepository.createData(roleName);
    response = {
      data: data,
    };
    return response;
  };

  static getAllData = async () => {
    let response = {};
    let data = await RoleRepository.allData();
    response = {
      data: data,
    };
    return response;
  };

  static getUserData = async (roleId: number) => {
    let response = {};
    let data = await RoleRepository.getUser(roleId);
    response = {
      data: data,
    };
    return response;
  };
}
