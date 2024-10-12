import { pool } from "../config/database.js";

// Function to get all exteriors
const getExteriors = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM exteriors ORDER BY exterior_id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get an exterior by ID
const getExteriorById = async (req, res) => {
  const { exteriorId } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM exteriors WHERE exterior_id = $1",
      [exteriorId]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Exterior not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getExteriors,
  getExteriorById,
};
