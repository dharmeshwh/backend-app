import { Router } from "express";
import authenticationRoute from "./authentication";
import profileRoute from "./profile";
import { validateRoute } from "../middleware/tokenHandler";

const apiRoutes = Router();

/**
 * Mount the authentication routes under the "/authentication" path
 */
apiRoutes.use("/authentication", authenticationRoute);

/**
 * Mount the profile routes under the "/profile" path and apply the "validateRoute" middleware
 */
apiRoutes.use("/profile", validateRoute, profileRoute);

export = apiRoutes;
