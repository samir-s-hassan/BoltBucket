import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarsAPI from '../../services/CarsAPI';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carData = await CarsAPI.getCarById(id);
        setCar(carData);
        console.log(carData); // For debugging
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Handle deletion of the car
  const handleDelete = async () => {
    try {
      await CarsAPI.deleteCar(id);
      alert("Car deleted successfully!");
      navigate('/customcars'); // Navigate back to the car list
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete car.");
    }
  };

  // Redirect to edit page
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!car) return <p>Loading car details...</p>;

  return (
    <div className="car-details">
      <h2>{car.name}</h2>
      <div className="car-part">
        <p><strong>Exterior:</strong> {car.exterior.color} - ${car.exterior.price}</p>
      </div>
      <div className="car-part">
        <p><strong>Interior:</strong> {car.interior.color} - ${car.interior.price}</p>
      </div>
      {car.roof && (
        <div className="car-part">
          <p><strong>Roof:</strong> {car.roof.color} - ${car.roof.price}</p>
        </div>
      )}
      <div className="car-part">
        <p><strong>Wheels:</strong> {car.wheels.color} - ${car.wheels.price}</p>
      </div>
      <div className="car-part">
        <p><strong>Base Price:</strong> ${car.basePrice - (car.totalPrice - car.basePrice)}</p>
      </div>
      <div className="car-part total-price">
        <p><strong>Total Price:</strong> ${car.basePrice}</p>
      </div>
      <button onClick={handleEdit} className="edit-button">Edit</button>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default CarDetails;
