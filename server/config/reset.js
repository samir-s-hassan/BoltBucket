import { pool } from "./database.js";
import "./dotenv.js";
import carsData from "../data/cars.js";
import wheelsData from "../data/wheels.js";
import interiorsData from "../data/interiors.js";
import exteriorsData from "../data/exteriors.js";
import roofsData from "../data/roofs.js";

// Function to create the wheels table
const createWheelsTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS wheels CASCADE;

      CREATE TABLE IF NOT EXISTS wheels (
        wheel_id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 wheels table created successfully");
  } catch (err) {
    console.error("⚠️ error creating wheels table", err);
  }
};

// Function to create the interiors table
const createInteriorsTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS interiors CASCADE;

      CREATE TABLE IF NOT EXISTS interiors (
        interior_id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        iscombo BOOLEAN
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 interiors table created successfully");
  } catch (err) {
    console.error("⚠️ error creating interiors table", err);
  }
};

// Function to create the exteriors table
const createExteriorsTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS exteriors CASCADE;

      CREATE TABLE IF NOT EXISTS exteriors (
        exterior_id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 exteriors table created successfully");
  } catch (err) {
    console.error("⚠️ error creating exteriors table", err);
  }
};

// Function to create the roofs table
const createRoofsTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS roofs CASCADE;

      CREATE TABLE IF NOT EXISTS roofs (
        roof_id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        isconvertible BOOLEAN
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 roofs table created successfully");
  } catch (err) {
    console.error("⚠️ error creating roofs table", err);
  }
};

// Function to create the cars table
const createCarsTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS cars;

      CREATE TABLE IF NOT EXISTS cars (
        car_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        isconvertible BOOLEAN,
        exterior_id INTEGER REFERENCES exteriors(exterior_id) ON DELETE CASCADE,
        roof_id INTEGER REFERENCES roofs(roof_id) ON DELETE CASCADE,
        wheel_id INTEGER REFERENCES wheels(wheel_id) ON DELETE CASCADE,
        interior_id INTEGER REFERENCES interiors(interior_id) ON DELETE CASCADE,
        price INTEGER NOT NULL
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 cars table created successfully");
  } catch (err) {
    console.error("⚠️ error creating cars table", err);
  }
};

// Seed functions for each table
const seedWheelsTable = async () => {
  await createWheelsTable();
  try {
    for (const wheel of wheelsData) {
      const insertQuery = `
          INSERT INTO wheels (color, image, price)
          VALUES ($1, $2, $3)
        `;
      await pool.query(insertQuery, [wheel.color, wheel.image, wheel.price]);
      console.log(`✅ Wheel: ${wheel.color} added successfully`);
    }
  } catch (err) {
    console.error("⚠️ error seeding wheels data", err);
  }
};

const seedInteriorsTable = async () => {
  await createInteriorsTable();
  try {
    for (const interior of interiorsData) {
      const insertQuery = `
          INSERT INTO interiors (color, image, price, iscombo)
          VALUES ($1, $2, $3, $4)
        `;
      await pool.query(insertQuery, [
        interior.color,
        interior.image,
        interior.price,
        interior.iscombo,
      ]);
      console.log(`✅ Interior: ${interior.color} added successfully`);
    }
  } catch (err) {
    console.error("⚠️ error seeding interiors data", err);
  }
};

const seedExteriorsTable = async () => {
  await createExteriorsTable();
  try {
    for (const exterior of exteriorsData) {
      const insertQuery = `
          INSERT INTO exteriors (color, image, price)
          VALUES ($1, $2, $3)
        `;
      await pool.query(insertQuery, [
        exterior.color,
        exterior.image,
        exterior.price,
      ]);
      console.log(`✅ Exterior: ${exterior.color} added successfully`);
    }
  } catch (err) {
    console.error("⚠️ error seeding exteriors data", err);
  }
};

const seedRoofsTable = async () => {
  await createRoofsTable();
  try {
    for (const roof of roofsData) {
      const insertQuery = `
          INSERT INTO roofs (color, image, price, isconvertible)
          VALUES ($1, $2, $3, $4)
        `;
      await pool.query(insertQuery, [
        roof.color,
        roof.image,
        roof.price,
        roof.isconvertible,
      ]);
      console.log(`✅ Roof: ${roof.color} added successfully`);
    }
  } catch (err) {
    console.error("⚠️ error seeding roofs data", err);
  }
};

const seedCarsTable = async () => {
  await createCarsTable();
  try {
    for (const car of carsData) {
      const insertQuery = `
          INSERT INTO cars (name, isconvertible, exterior_id, roof_id, wheel_id, interior_id, price)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
      await pool.query(insertQuery, [
        car.name,
        car.isConvertible,
        car.exterior,
        car.roof,
        car.wheels,
        car.interior,
        car.price,
      ]);
      console.log(`✅ Car: ${car.name} added successfully`);
    }
  } catch (err) {
    console.error("⚠️ error seeding cars data", err);
  }
};

// Seed all tables in the correct order
const seedTables = async () => {
  await seedWheelsTable();
  await seedInteriorsTable();
  await seedExteriorsTable();
  await seedRoofsTable();
  await seedCarsTable();
};

seedTables();
