import { createContext, useReducer } from 'react';
import searchFood from '../api/foodApi';
import RandomKey from '../components/RandomKey';

const GET_API_DATA = 'get-api-data';
const UPDATE_ONCHANGE_FOOD_DATA = 'update-onchange-food-data';
const ADD_FOOD_SECTION = 'add-food-section';
const ADD_RECIPE_SECTION = 'add-recipe-section';
const CLEAR_FOOD_SECTION = 'clear-food-section';
const DELETE_FOOD_BY_ID = 'delete-food-by-id';
const DELETE_RECIPE_BY_ID = 'delete-recipe-by-id';
const DELETE_ALL_RECIPES = 'delete-all-recipes';
const TOTAL_NUTRITION = 'total-nutrition';
const ADD_USER_DATA = 'add-user-data';
const ADD_USER_BMI = 'add-user-bmi';

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
          id: state.currentFood.id,
          name: state.currentFood.name,
          calories: +(
            (state.currentFood.calories / 100) *
            action.payload
          ).toFixed(2),
          protein: +(
            (state.currentFood.protein / 100) *
            action.payload
          ).toFixed(2),
          carb: +((state.currentFood.carb / 100) * action.payload).toFixed(2),
          fat: +((state.currentFood.fat / 100) * action.payload).toFixed(2),
          serving: (state.currentFood.serving / 100) * action.payload,
        },
      };

    case ADD_FOOD_SECTION:
      if (state.currentUpdFood) {
        return {
          ...state,
          TotalFood: [...state.TotalFood, state.currentUpdFood],
          currentFood: '',
          currentUpdFood: '',
        };
      } else {
        return {
          ...state,
          TotalFood: [...state.TotalFood, state.currentFood],
          TotalNutrition: {
            calories: state.TotalFood.reduce((acc, food) => {
              return acc + food.calories;
            }, 0),
            protein: state.TotalFood.reduce((acc, food) => {
              return acc + food.protein;
            }, 0),
            carb: state.TotalFood.reduce((acc, food) => {
              return acc + food.carb;
            }, 0),
            fat: state.TotalFood.reduce((acc, food) => {
              return acc + food.fat;
            }, 0),
          },
          currentFood: '',
          currentUpdFood: '',
        };
      }

    case ADD_RECIPE_SECTION:
      return {
        ...state,
        TotalNutrition: '',
        Recipes: [
          ...state.Recipes,
          {
            id: RandomKey(),
            ingredient: [...state.TotalFood],
            RecipeName: action.payload,
            TotalNutrition: {
              calories: state.TotalNutrition.calories,
              protein: state.TotalNutrition.protein,
              carb: state.TotalNutrition.carb,
              fat: state.TotalNutrition.fat,
            },
          },
        ],
      };

    case CLEAR_FOOD_SECTION:
      return {
        ...state,
        TotalFood: [],
      };

    case DELETE_FOOD_BY_ID:
      return {
        ...state,
        TotalFood: state.TotalFood.filter((food) => {
          return food.id !== action.payload;
        }),
      };

    case DELETE_RECIPE_BY_ID:
      return {
        ...state,
        Recipes: state.Recipes.filter((food) => {
          return food.id !== action.payload;
        }),
      };

    case DELETE_ALL_RECIPES:
      return {
        ...state,
        Recipes: [],
      };

    case TOTAL_NUTRITION:
      return {
        ...state,
        TotalNutrition: {
          calories: state.TotalFood.reduce((acc, value) => {
            return acc + value.calories;
          }, 0),
          protein: state.TotalFood.reduce((acc, value) => {
            return acc + value.protein;
          }, 0),
          carb: state.TotalFood.reduce((acc, value) => {
            return acc + value.carb;
          }, 0),
          fat: state.TotalFood.reduce((acc, value) => {
            return acc + value.fat;
          }, 0),
        },
      };

    case ADD_USER_DATA:
      return {
        ...state,
        UserData: action.payload,
      };

    case ADD_USER_BMI:
      const data = action.payload;
      return {
        ...state,
        UserBMI: {
          calories:
            (66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
            data.activity *
            data.yourGoal,
          protein:
            ((66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
              data.activity *
              data.yourGoal *
              23) /
            100 /
            4,
          carb:
            ((66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
              data.activity *
              data.yourGoal *
              54) /
            100 /
            4,
          fat:
            ((66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
              data.activity *
              data.yourGoal *
              23) /
            100 /
            9,
        },
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
    TotalNutrition: '',
    Recipes: [],
    UserData: '',
    UserBMI: '',
  });

  const getFoodData = async (food) => {
    console.log(food);
    const data = await searchFood(food);

    console.log(data);

    dispatch({
      type: GET_API_DATA,
      payload: data,
    });
  };

  const updateOnChange = (data) => {
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

  const addRecipeSection = (recName) => {
    console.log(recName);
    dispatch({
      type: ADD_RECIPE_SECTION,
      payload: recName,
    });
  };

  const clearTotalFood = () => {
    dispatch({
      type: CLEAR_FOOD_SECTION,
    });
  };

  const deleteFoodById = (id) => {
    dispatch({
      type: DELETE_FOOD_BY_ID,
      payload: id,
    });
  };

  const deleteRecipeById = (id) => {
    dispatch({
      type: DELETE_RECIPE_BY_ID,
      payload: id,
    });
  };

  const deleteAllRecipes = () => {
    dispatch({
      type: DELETE_ALL_RECIPES,
    });
  };

  const totalNutrition = () => {
    dispatch({ type: TOTAL_NUTRITION });
  };

  const addUserData = (userData) => {
    dispatch({
      type: ADD_USER_DATA,
      payload: userData,
    });
  };

  const addUserBMI = (userBMI) => {
    dispatch({
      type: ADD_USER_BMI,
      payload: userBMI,
    });
  };

  const valueToShare = {
    getFoodData,
    updateOnChange,
    addFoodSection,
    addRecipeSection,
    clearTotalFood,
    deleteFoodById,
    deleteRecipeById,
    deleteAllRecipes,
    totalNutrition,
    addUserData,
    addUserBMI,
    state,
  };

  return (
    <FoodContext.Provider value={valueToShare}>{children}</FoodContext.Provider>
  );
}

export { FoodProvider };
export default FoodContext;
