//import express, {Request, Response} from "express";
import express, * as expressObj from "express";
import sequelize from "./dbConn/conn";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import groceryRoutes from "./routes/groceryRoutes";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

// for getting file path
// console.log("===============", __dirname);
// console.log("===============", __filename);

app.get("/test", (req: expressObj.Request, res: expressObj.Response): void => {
  res.json({ data: "test page" });
});

app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/grocery", groceryRoutes);

app.listen(PORT, (): void => {
  console.log(`Server is running on port at ${PORT}`);
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Database connected");
      try {
        await sequelize.sync({ force: false });
      } catch (error) {
        console.log(error, "error+++");
      }
    })
    .catch((err: Error) => {
      console.log("Error+++" + err);
    });
});