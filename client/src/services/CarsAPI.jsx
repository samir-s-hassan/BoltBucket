// Define the base URL for the Cars API
const CARS_API_BASE_URL = "http://localhost:3000/cars"; // Adjust as needed

// Function to get all cars
const getAllCars = async () => {
  try {
    const response = await fetch(`${CARS_API_BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching all cars:", error);
    throw error;
  }
};

// Function to get a car by ID
const getCarById = async (carId) => {
  try {
    const response = await fetch(`${CARS_API_BASE_URL}/${carId}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching car with ID ${carId}:`, error);
    throw error;
  }
};

// Function to create a new car
const createCar = async (carData) => {
  try {
    const response = await fetch(`${CARS_API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating a new car:", error);
    throw error;
  }
};

// Function to update an existing car by ID
const updateCar = async (carId, carData) => {
  try {
    const response = await fetch(`${CARS_API_BASE_URL}/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    return response.json();
  } catch (error) {
    console.error(`Error updating car with ID ${carId}:`, error);
    throw error;
  }
};

// Function to delete a car by ID
const deleteCar = async (carId) => {
  try {
    const response = await fetch(`${CARS_API_BASE_URL}/${carId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete car with ID ${carId}`);
    }
    return { message: "Car deleted successfully" };
  } catch (error) {
    console.error(`Error deleting car with ID ${carId}:`, error);
    throw error;
  }
};

// Export all functions
const CarsAPI = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};

export default CarsAPI;
