import express from "express";
import userController from "../controller/userController";
import mw from "../middleWare/authentication";

const router = express.Router();

router.get('/getRoleByUserToken', mw.authentication, userController.getRoleByUserToken);
router.post("/create", userController.create);
router.get("/get", mw.authentication, userController.getList);
router.get('/:Id', mw.authentication, userController.getListById);
router.put('/update', mw.authentication, userController.update);
router.delete('/:Id', mw.authentication, userController.delete);
router.post('/login', userController.login);
router.get('/getRoleByUserById/:Id', userController.getRoleByUserById);

export default router;