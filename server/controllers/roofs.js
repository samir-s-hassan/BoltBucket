import { pool } from "../config/database.js";

// Function to get all roofs
const getRoofs = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM roofs ORDER BY roof_id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a roof by ID
const getRoofById = async (req, res) => {
  const { roofId } = req.params;
  try {
    const results = await pool.query("SELECT * FROM roofs WHERE roof_id = $1", [
      roofId,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Roof not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getRoofs,
  getRoofById,
};
