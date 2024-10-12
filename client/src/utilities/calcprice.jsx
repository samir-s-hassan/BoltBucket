// utilities/calcPrice.js

/**
 * Calculates the total price of a car based on the base price and selected options.
 * @param {number} basePrice - The base price of the car.
 * @param {object} options - An object containing the prices of selected options.
 * @param {number} options.roofPrice - The price of the selected roof option.
 * @param {number} options.exteriorPrice - The price of the selected exterior option.
 * @param {number} options.interiorPrice - The price of the selected interior option.
 * @param {number} options.wheelPrice - The price of the selected wheel option.
 * @returns {number} The total calculated price.
 */
const calculateTotalPrice = (basePrice, { roofPrice = 0, exteriorPrice = 0, interiorPrice = 0, wheelPrice = 0 }) => {
    return basePrice + roofPrice + exteriorPrice + interiorPrice + wheelPrice;
  };
  
  // Export the function
  export default calculateTotalPrice;
  