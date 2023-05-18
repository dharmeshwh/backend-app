import { Router } from "express";
import { validate } from "../../middleware/validater";
import { loginContract, signupContract } from "./contract";
import { authController } from "../../controller/authentication";

const profileRoute = Router();

profileRoute.post("/signup", validate(signupContract), authController.signup);

profileRoute.post("/login", validate(loginContract), authController.login);

export = profileRoute;
