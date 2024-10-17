import { pool } from "../config/database.js";

// Function to get all cars
const getCars = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT 
        c.car_id, 
        c.name, 
        c.isconvertible, 
        e.color AS exterior_color, 
        r.color AS roof_color, 
        w.color AS wheel_color, 
        i.color AS interior_color, 
        c.price
      FROM cars c
      INNER JOIN exteriors e ON c.exterior_id = e.exterior_id
      INNER JOIN roofs r ON c.roof_id = r.roof_id
      INNER JOIN wheels w ON c.wheel_id = w.wheel_id
      INNER JOIN interiors i ON c.interior_id = i.interior_id
      ORDER BY c.car_id ASC
    `);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a car by its ID
// Function to get a car by its ID, including component prices and total price calculation
const getCarById = async (req, res) => {
  const { carId } = req.params;
  try {
    const results = await pool.query(
      `
      SELECT 
        c.car_id, 
        c.name, 
        c.isconvertible, 
        e.color AS exterior_color,
        e.price AS exterior_price,
        r.color AS roof_color,
        r.price AS roof_price,
        w.color AS wheel_color,
        w.price AS wheel_price,
        i.color AS interior_color,
        i.price AS interior_price,
        c.price AS base_price,
        -- Total price calculation
        c.price + e.price + w.price + i.price + COALESCE(r.price, 0) AS total_price
      FROM cars c
      INNER JOIN exteriors e ON c.exterior_id = e.exterior_id
      LEFT JOIN roofs r ON c.roof_id = r.roof_id -- LEFT JOIN to account for convertibles without roofs
      INNER JOIN wheels w ON c.wheel_id = w.wheel_id
      INNER JOIN interiors i ON c.interior_id = i.interior_id
      WHERE c.car_id = $1
    `,
      [carId]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    const car = results.rows[0];

    res.status(200).json({
      id: car.car_id,
      name: car.name,
      isConvertible: car.isconvertible,
      exterior: {
        color: car.exterior_color,
        price: car.exterior_price,
      },
      interior: {
        color: car.interior_color,
        price: car.interior_price,
      },
      roof: car.isconvertible
        ? null
        : {
            // Only include roof details if not a convertible
            color: car.roof_color,
            price: car.roof_price,
          },
      wheels: {
        color: car.wheel_color,
        price: car.wheel_price,
      },
      basePrice: car.base_price,
      totalPrice: car.total_price,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update a car by its ID
const updateCarById = async (req, res) => {
  const { carId } = req.params;
  const {
    name,
    isconvertible,
    exterior_id,
    roof_id,
    wheel_id,
    interior_id,
    price,
  } = req.body;
  try {
    const updateQuery = `
      UPDATE cars
      SET name = $1, isconvertible = $2, exterior_id = $3, roof_id = $4, wheel_id = $5, interior_id = $6, price = $7
      WHERE car_id = $8
      RETURNING *
    `;
    const values = [
      name,
      isconvertible,
      exterior_id,
      roof_id,
      wheel_id,
      interior_id,
      price,
      carId,
    ];
    const results = await pool.query(updateQuery, values);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a car by its ID
const deleteCarById = async (req, res) => {
  const { carId } = req.params;
  try {
    const results = await pool.query(
      "DELETE FROM cars WHERE car_id = $1 RETURNING *",
      [carId]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to create a new car
const createCar = async (req, res) => {
  const {
    name,
    isconvertible,
    exterior_id,
    roof_id,
    wheel_id,
    interior_id,
    price,
  } = req.body;
  try {
    const insertQuery = `
      INSERT INTO cars (name, isconvertible, exterior_id, roof_id, wheel_id, interior_id, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      name,
      isconvertible,
      exterior_id,
      roof_id,
      wheel_id,
      interior_id,
      price,
    ];
    const results = await pool.query(insertQuery, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCars,
  getCarById,
  updateCarById,
  deleteCarById,
  createCar,
};
