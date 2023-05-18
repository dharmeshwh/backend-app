import { Router } from "express";
import { profileController } from "../../controller/profile";

const profileRoute = Router();

/**
 * Route to get user details
 */
profileRoute.get("/user-details", profileController.getUserDetails);

export = profileRoute;
