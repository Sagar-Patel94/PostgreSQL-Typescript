import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import user from "../models/user";
import role from "../models/role";

export default class middleWare {
  static authentication = (req: Request, res: Response, next: NextFunction) => {
    let authorizationToken: any = req.get("authorization");
    let token: string = authorizationToken.split(" ")[1];
    jwt.verify(token, "secret", async function (err, decoded) {
      if (decoded) {
        let decode: any = jwt.decode(token);
        let data: any = await user.findByPk(decode.Id, {
          attributes: ["Id", "RoleId", "Name"],
          include: [
            {
              model: role,
              attributes: ["Id", "Name"],
            },
          ],
        });
        // console.log(JSON.stringify(data))   // proper data display in console // convert data into json format
        if (data.role.Name == "Admin") {
          res.locals.Id = data.Id;
          next();
        } else if (data.role.Name == "Customer") {
          next();
        } else {
          return res
            .status(200)
            .json({ message: "You are not authorized user" });
        }
      } else {
        return res.status(200).json({ message: "Invalid Token" });
      }
    });
  };
}
