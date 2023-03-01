import { createContext, useReducer } from 'react';
import searchFood from '../api/foodApi';

const GET_API_DATA = 'get-api-data';
const UPDATE_ONCHANGE_FOOD_DATA = 'update-onchange-food-data';
const ADD_FOOD_SECTION = 'add-food-section';

const FoodContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case GET_API_DATA:
      return {
        ...state,
        currentFood: action.payload,
      };

    case UPDATE_ONCHANGE_FOOD_DATA:
      return {
        ...state,
        currentUpdFood: {
          name: state.currentFood.name,
          calories: (state.currentFood.calories / 100) * action.payload,
          protein: (state.currentFood.protein / 100) * action.payload,
          carb: (state.currentFood.carb / 100) * action.payload,
          fat: (state.currentFood.fat / 100) * action.payload,
        },
      };

    case ADD_FOOD_SECTION:
      if (state.currentFood === '') return state;
      return {
        ...state,
        currentFood: '',
        currentUpdFood: '',
        TotalFood: state.TotalFood.push(state.currentUpdFood),
      };
    default:
      return state;
  }
};

function FoodProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    currentFood: '',
    currentUpdFood: '',
    TotalFood: [],
  });

  const getFoodData = async food => {
    console.log(food);
    const data = await searchFood(food);

    console.log(data);

    dispatch({
      type: GET_API_DATA,
      payload: data,
    });
  };

  const updateOnChange = data => {
    dispatch({
      type: UPDATE_ONCHANGE_FOOD_DATA,
      payload: data,
    });
  };

  const addFoodSection = () => {
    dispatch({
      type: ADD_FOOD_SECTION,
    });
  };

  const valueToShare = {
    getFoodData,
    updateOnChange,
    addFoodSection,
    state,
  };

  return (
    <FoodContext.Provider value={valueToShare}>{children}</FoodContext.Provider>
  );
}

export { FoodProvider };
export default FoodContext;
