import express from "express";
import groceryController from "../controller/groceryController";
import mw from "../middleWare/authentication";

const router = express.Router();

router.get('/getListById/:Id', groceryController.getListById);
router.post('/create', mw.authentication, groceryController.create);
router.get('/getAllList',  groceryController.getAllList);
router.put('/update', mw.authentication, groceryController.update);
router.delete('/delete/:Id', mw.authentication, groceryController.delete);

export default router;