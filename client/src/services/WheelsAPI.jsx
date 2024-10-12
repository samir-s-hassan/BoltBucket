// Define the base URL for the Wheels API
const WHEELS_API_BASE_URL = "http://localhost:3000/wheels"; // Adjust as needed

// Function to get all wheels
const getAllWheels = async () => {
  try {
    const response = await fetch(`${WHEELS_API_BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching all wheels:", error);
    throw error;
  }
};

// Function to get a wheel by ID
const getWheelById = async (wheelId) => {
  try {
    const response = await fetch(`${WHEELS_API_BASE_URL}/${wheelId}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching wheel with ID ${wheelId}:`, error);
    throw error;
  }
};

// Export all functions
const WheelsAPI = {
  getAllWheels,
  getWheelById,
};

export default WheelsAPI;
