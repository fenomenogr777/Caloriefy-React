import { createContext, useState } from 'react';

const FoodContext = createContext();

function FoodProvider({ children }) {
  const [nutritionData, setNutritionData] = useState('');

  const updateNutritionData = nutritionData => {
    setNutritionData(nutritionData);
    console.log(nutritionData);
  };

  const valueToShare = {
    nutritionData,
    updateNutritionData,
  };

  return (
    <FoodContext.Provider value={valueToShare}>{children}</FoodContext.Provider>
  );
}

export { FoodProvider };
export default FoodContext;
