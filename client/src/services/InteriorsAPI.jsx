// Define the base URL for the Interiors API
const INTERIORS_API_BASE_URL = "http://localhost:3000/interiors"; // Adjust as needed

// Function to get all interiors
const getAllInteriors = async () => {
  try {
    const response = await fetch(`${INTERIORS_API_BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching all interiors:", error);
    throw error;
  }
};

// Function to get an interior by ID
const getInteriorById = async (interiorId) => {
  try {
    const response = await fetch(`${INTERIORS_API_BASE_URL}/${interiorId}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching interior with ID ${interiorId}:`, error);
    throw error;
  }
};

// Export all functions
const InteriorsAPI = {
  getAllInteriors,
  getInteriorById,
};

export default InteriorsAPI;
