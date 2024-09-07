import express from "express";
const adminRouter = express.Router();
import {addAdmin,adminlogin,getAdmins} from "../controllers/admin-controller.js";

adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminlogin);
adminRouter.get("/",getAdmins);

export default adminRouter;