import express from "express";
import carsController from "../controllers/cars.js";

const carsRouter = express.Router();

// Define routes to get all cars, get a car by its ID, update a car by its ID, delete a car by its ID, and create a new car
carsRouter.get("/", carsController.getCars);
carsRouter.get("/:carId", carsController.getCarById);
carsRouter.put("/:carId", carsController.updateCarById);
carsRouter.delete("/:carId", carsController.deleteCarById);
carsRouter.post("/", carsController.createCar);

export default carsRouter;
