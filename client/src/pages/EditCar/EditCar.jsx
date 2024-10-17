import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditCar.css";
import CarsAPI from "../../services/CarsAPI";
import InteriorsAPI from "../../services/InteriorsAPI";
import ExteriorsAPI from "../../services/ExteriorsAPI";
import RoofsAPI from "../../services/RoofsAPI";
import WheelsAPI from "../../services/WheelsAPI";
import calculateTotalPrice from "../../utilities/calcprice";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [interiorId, setInteriorId] = useState("");
  const [exteriorId, setExteriorId] = useState("");
  const [roofId, setRoofId] = useState("");
  const [wheelId, setWheelId] = useState("");
  const [basePrice, setBasePrice] = useState(20000); // Default base price for initialization
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [isConvertible, setIsConvertible] = useState(true);

  const [interiors, setInteriors] = useState([]);
  const [exteriors, setExteriors] = useState([]);
  const [roofs, setRoofs] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [optionPrices, setOptionPrices] = useState({
    interiorPrice: 0,
    exteriorPrice: 0,
    roofPrice: 0,
    wheelPrice: 0,
  });

  // Fetch car data for editing and load options
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carData = await CarsAPI.getCarById(id);

        setName(carData.name);
        setInteriorId(carData.interior.id);
        setExteriorId(carData.exterior.id);
        setRoofId(carData.roof ? carData.roof.id : "");
        setWheelId(carData.wheels.id);
        setIsConvertible(carData.isConvertible);
        setTotalPrice(carData.totalPrice);
        setBasePrice(carData.basePrice);

        // Set initial prices for each component for total price calculation
        setOptionPrices({
          interiorPrice: carData.interior.price,
          exteriorPrice: carData.exterior.price,
          roofPrice: carData.roof ? carData.roof.price : 0,
          wheelPrice: carData.wheels.price,
        });

        // Fetch component options
        const interiorsData = await InteriorsAPI.getAllInteriors();
        const exteriorsData = await ExteriorsAPI.getAllExteriors();
        const roofsData = await RoofsAPI.getAllRoofs();
        const wheelsData = await WheelsAPI.getAllWheels();

        setInteriors(interiorsData);
        setExteriors(exteriorsData);
        setRoofs(roofsData);
        setWheels(wheelsData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id]);

  // Handle convertible toggle
  const handleConvertibleChange = (e) => {
    setIsConvertible(e.target.checked);
    if (e.target.checked) {
      setRoofId("");
      setOptionPrices((prevPrices) => ({ ...prevPrices, roofPrice: 0 }));
    }
  };

  // Function to update option price based on selection
  const updatePrice = (optionType, selectedId, data) => {
    const selectedOption = data.find(
      (item) => item[`${optionType}_id`] === parseInt(selectedId)
    );
    const optionPrice = selectedOption ? selectedOption.price : 0;

    setOptionPrices((prevPrices) => ({
      ...prevPrices,
      [`${optionType}Price`]: optionPrice,
    }));
  };

  // Update total price on changes
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(basePrice, optionPrices);
    setTotalPrice(newTotalPrice);
  }, [basePrice, optionPrices]);

  // Submit handler for updating the car
  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      name,
      isconvertible: isConvertible,
      interior_id: interiorId,
      exterior_id: exteriorId,
      roof_id: roofId || null,
      wheel_id: wheelId,
      price: totalPrice,
    };

    try {
      await CarsAPI.updateCar(id, carData);
      alert("Car updated successfully!");
      navigate(`/customcars/${id}`);
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car");
    }
  };

  return (
    <div className="create-car">
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interior">Interior:</label>
          <select
            id="interior"
            value={interiorId}
            onChange={(e) => {
              setInteriorId(e.target.value);
              updatePrice("interior", e.target.value, interiors);
            }}
            required
          >
            <option value="">Select an Interior</option>
            {interiors.map((interior) => (
              <option key={interior.interior_id} value={interior.interior_id}>
                {interior.color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="exterior">Exterior:</label>
          <select
            id="exterior"
            value={exteriorId}
            onChange={(e) => {
              setExteriorId(e.target.value);
              updatePrice("exterior", e.target.value, exteriors);
            }}
            required
          >
            <option value="">Select an Exterior</option>
            {exteriors.map((exterior) => (
              <option key={exterior.exterior_id} value={exterior.exterior_id}>
                {exterior.color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="roof">Roof:</label>
          <select
            id="roof"
            value={roofId}
            onChange={(e) => {
              setRoofId(e.target.value);
              updatePrice("roof", e.target.value, roofs);
            }}
            disabled={isConvertible}
          >
            <option value="">Select a Roof (optional)</option>
            {roofs.map((roof) => (
              <option key={roof.roof_id} value={roof.roof_id}>
                {roof.color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="wheels">Wheels:</label>
          <select
            id="wheels"
            value={wheelId}
            onChange={(e) => {
              setWheelId(e.target.value);
              updatePrice("wheel", e.target.value, wheels);
            }}
            required
          >
            <option value="">Select Wheels</option>
            {wheels.map((wheel) => (
              <option key={wheel.wheel_id} value={wheel.wheel_id}>
                {wheel.color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="convertible">Convertible:</label>
          <input
            type="checkbox"
            id="convertible"
            checked={isConvertible}
            onChange={handleConvertibleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Price:</label>
          <p className="total-price">${totalPrice}</p>
        </div>

        <button type="submit" className="submit-button">
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditCar;
