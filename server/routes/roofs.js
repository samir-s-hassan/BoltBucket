import express from "express";
import roofsController from "../controllers/roofsController.js";

const roofsRouter = express.Router();

// Define routes to get all roofs and get a roof by its ID
roofsRouter.get("/", roofsController.getRoofs);
roofsRouter.get("/:roofId", roofsController.getRoofById);

export default roofsRouter;
