import { configureStore } from '@reduxjs/toolkit'
import { formReducer, changeQuery } from './slices/formSlice'
import {
   foodReducer,
   addIngredient,
   changeIngredientValue,
   removeIngredient,
   addRecipe,
   removeRecipe,
   removeAllRecipes,
   addMeal,
   resetMeal,
   resetIngredient,
   addRecipeTitle,
} from './slices/foodSlice'

const store = configureStore({
   reducer: {
      storeForm: formReducer,
      storeFood: foodReducer,
   },
})

export {
   store,
   addIngredient,
   changeIngredientValue,
   removeIngredient,
   addRecipe,
   removeRecipe,
   removeAllRecipes,
   changeQuery,
   addMeal,
   resetMeal,
   resetIngredient,
   addRecipeTitle,
}
