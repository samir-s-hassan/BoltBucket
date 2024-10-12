import { pool } from "../config/database.js";

// Function to get all wheels
const getWheels = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM wheels ORDER BY wheel_id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a wheel by ID
const getWheelById = async (req, res) => {
  const { wheelId } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM wheels WHERE wheel_id = $1",
      [wheelId]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Wheel not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getWheels,
  getWheelById,
};
