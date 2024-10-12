import React, { useState, useEffect } from "react";
import "../css/CreateCar.css";
import CarsAPI from "../services/CarsAPI";
import InteriorsAPI from "../services/InteriorsAPI";
import ExteriorsAPI from "../services/ExteriorsAPI";
import RoofsAPI from "../services/RoofsAPI";
import WheelsAPI from "../services/WheelsAPI";
import calculateTotalPrice from "../utilities/calcprice";

const CreateCar = () => {
  const [name, setName] = useState("");
  const [interiorId, setInteriorId] = useState("");
  const [exteriorId, setExteriorId] = useState("");
  const [roofId, setRoofId] = useState("");
  const [wheelId, setWheelId] = useState("");
  const [basePrice, setBasePrice] = useState(20000); // Base price for the car
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

  // Fetch data for interiors, exteriors, roofs, and wheels
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const interiorsData = await InteriorsAPI.getAllInteriors();
        const exteriorsData = await ExteriorsAPI.getAllExteriors();
        const roofsData = await RoofsAPI.getAllRoofs();
        const wheelsData = await WheelsAPI.getAllWheels();

        setInteriors(interiorsData);
        setExteriors(exteriorsData);
        setRoofs(roofsData);
        setWheels(wheelsData);
      } catch (error) {
        console.error("Error fetching car options:", error);
      }
    };

    fetchOptions();
  }, []);

  // Update the roof dropdown and Convertible checkbox based on the checkbox state
  const handleConvertibleChange = (e) => {
    setIsConvertible(e.target.checked);
    if (e.target.checked) {
      setRoofId("");
      setOptionPrices((prevPrices) => ({ ...prevPrices, roofPrice: 0 }));
    }
  };

  // Function to handle option price updates based on selected values
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

  // Calculate the total price whenever the base price or option prices change
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(basePrice, optionPrices);
    setTotalPrice(newTotalPrice);
  }, [basePrice, optionPrices]);

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
      await CarsAPI.createCar(carData);
      alert("Car created successfully!");
      // Reset form
      setName("");
      setInteriorId("");
      setExteriorId("");
      setRoofId("");
      setWheelId("");
      setOptionPrices({
        interiorPrice: 0,
        exteriorPrice: 0,
        roofPrice: 0,
        wheelPrice: 0,
      });
      setTotalPrice(basePrice);
      setIsConvertible(true);
    } catch (error) {
      console.error("Error creating car:", error);
      alert("Failed to create car");
    }
  };

  return (
    <div className="create-car">
      <h2>Create a New Car</h2>
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
          Create Car
        </button>
      </form>
    </div>
  );
};

export default CreateCar;
