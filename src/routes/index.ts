import { Router } from "express";
import authenticationRoute from "./authentication";
import profileRoute from "./profile";
import { validateRoute } from "../middleware/tokenHandler";

const apiRoute = Router();

apiRoute.use("/authentication", authenticationRoute);

apiRoute.use("/profile", validateRoute, profileRoute);

export = apiRoute;
