import express from "express";
import interiorsController from "../controllers/interiorsController.js";

const interiorsRouter = express.Router();

// Define routes to get all interiors and get an interior by its ID
interiorsRouter.get("/", interiorsController.getInteriors);
interiorsRouter.get("/:interiorId", interiorsController.getInteriorById);

export default interiorsRouter;
