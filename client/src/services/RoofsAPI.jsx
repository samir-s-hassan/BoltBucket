// Define the base URL for the Roofs API
const ROOFS_API_BASE_URL = "http://localhost:3000/roofs"; // Adjust as needed

// Function to get all roofs
const getAllRoofs = async () => {
  try {
    const response = await fetch(`${ROOFS_API_BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching all roofs:", error);
    throw error;
  }
};

// Function to get a roof by ID
const getRoofById = async (roofId) => {
  try {
    const response = await fetch(`${ROOFS_API_BASE_URL}/${roofId}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching roof with ID ${roofId}:`, error);
    throw error;
  }
};

// Export all functions
const RoofsAPI = {
  getAllRoofs,
  getRoofById,
};

export default RoofsAPI;
