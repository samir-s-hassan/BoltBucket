import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import CarsAPI from '../../services/CarsAPI';
import './ViewCars.css';

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await CarsAPI.getAllCars();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="view-cars">
      <h2>All Custom Cars</h2>
      <div className="cars-container">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <h3>{car.name}</h3>
            <p><strong>Exterior:</strong> {car.exterior_color}</p>
            <p><strong>Interior:</strong> {car.interior_color}</p>
            {car.isconvertible ? (
              <p><strong>Convertible:</strong> Yes</p>
            ) : (
              <p><strong>Roof:</strong> {car.roof_color}</p>
            )}
            <p><strong>Wheels:</strong> {car.wheel_color}</p>
            <p><strong>Price:</strong> ${car.price}</p>
            {/* Details button */}
            <Link to={`/customcars/${car.id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
