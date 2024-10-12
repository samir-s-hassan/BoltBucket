import express from "express";
import exteriorsController from "../controllers/exteriorsController.js";

const exteriorsRouter = express.Router();

// Define routes to get all exteriors and get an exterior by its ID
exteriorsRouter.get("/", exteriorsController.getExteriors);
exteriorsRouter.get("/:exteriorId", exteriorsController.getExteriorById);

export default exteriorsRouter;
