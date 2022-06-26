import express from "express";
import roleController from "../controller/roleController";

const router = express.Router();

router.post('/create', roleController.create);
router.get('/getAllList', roleController.getList);
router.get('/getUserByRoleById/:Id', roleController.getUserByRoleById);

export default router;