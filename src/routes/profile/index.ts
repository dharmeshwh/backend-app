import { Router } from "express";
import { profileController } from "../../controller/profile";

const profileRoute = Router();

profileRoute.get("/user-details", profileController.getUserDetails);

export = profileRoute;
