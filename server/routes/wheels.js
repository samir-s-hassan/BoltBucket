import express from "express";
import wheelsController from "../controllers/wheelsController.js";

const wheelsRouter = express.Router();

// Define routes to get all wheels and get a wheel by its ID
wheelsRouter.get("/", wheelsController.getWheels);
wheelsRouter.get("/:wheelId", wheelsController.getWheelById);

export default wheelsRouter;
