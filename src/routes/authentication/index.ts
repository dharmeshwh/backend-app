import { Router } from "express";
import { validate } from "../../middleware/validater";
import { loginContract, signupContract } from "./contract";
import { authController } from "../../controller/authentication";
import { hashPassword } from "../../middleware/bcrypt";

const authenticationRoute = Router();

// Define routes for signup and login

authenticationRoute.post(
  "/signup",
  validate(signupContract), // Validate the request body against the signup contract schema
  hashPassword, // Hash the password using the bcrypt middleware
  authController.signup // Handle the signup logic in the authController
);

authenticationRoute.post(
  "/login",
  validate(loginContract), // Validate the request body against the login contract schema
  authController.login // Handle the login logic in the authController
);

export = authenticationRoute;
