import { Router } from "express";
import profileRoute from "./profile/profile";

const apiRoute = Router();

apiRoute.use("/profile", profileRoute);

export = apiRoute;
