// Define the base URL for the Exteriors API
const EXTERIORS_API_BASE_URL = "http://localhost:3000/exteriors"; // Adjust as needed

// Function to get all exteriors
const getAllExteriors = async () => {
  try {
    const response = await fetch(`${EXTERIORS_API_BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching all exteriors:", error);
    throw error;
  }
};

// Function to get an exterior by ID
const getExteriorById = async (exteriorId) => {
  try {
    const response = await fetch(`${EXTERIORS_API_BASE_URL}/${exteriorId}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching exterior with ID ${exteriorId}:`, error);
    throw error;
  }
};

// Export all functions
const ExteriorsAPI = {
  getAllExteriors,
  getExteriorById,
};

export default ExteriorsAPI;
