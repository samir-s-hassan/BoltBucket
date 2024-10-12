import { pool } from "../config/database.js";

// Function to get all interiors
const getInteriors = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM interiors ORDER BY interior_id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get an interior by ID
const getInteriorById = async (req, res) => {
  const { interiorId } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM interiors WHERE interior_id = $1",
      [interiorId]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Interior not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getInteriors,
  getInteriorById,
};
