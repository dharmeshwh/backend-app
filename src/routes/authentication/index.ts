import { Router } from "express";
import { validate } from "../../middleware/validater";
import { loginContract, signupContract } from "./contract";
import { authController } from "../../controller/authentication";
import { validatePassword } from "../../middleware/bcrypt";

const authenticationRoute = Router();

authenticationRoute.post(
  "/signup",
  validate(signupContract),
  validatePassword,
  authController.signup
);

authenticationRoute.post(
  "/login",
  validate(loginContract),
  authController.login
);

export = authenticationRoute;
