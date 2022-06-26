import role from "../models/role";
import user from "../models/user";

export default class releRepo {
  static async createData(roleName: string) {
    let data = await role.create({
      Name: roleName,
    });
    let response = {
      data: data,
    };
    return response;
  }

  static async allData() {
    let data = await role.findAll();
    let response = {
      data: data,
    };
    return response;
  }

  static async getUser(roleId: number) {
    let data = await role.findByPk(roleId, {
      attributes: ["Id", "Name"],
      include: [
        {
          model: user,
          attributes: ["Id", "RoleId", "Name", "Email"],
        },
      ],
    });
    let response = {
      data: data,
    };
    return response;
  }
}
