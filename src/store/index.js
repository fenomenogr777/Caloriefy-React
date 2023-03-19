import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
   formReducer,
   getUserData,
   openUserData,
   deleteUserData,
   getUserBMI,
} from './slices/formSlice'

import {
   foodReducer,
   addIngredientData,
   addMeal,
   deleteIngredient,
   addRecipe,
   deleteRecipe,
   deleteAllRecipes,
   deleteAllMeal,
   addRecipesLocalStorage,
} from './slices/foodSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { getNutritionDataApi } from './apis/getFoodNutritionDataApi'

const store = configureStore({
   reducer: {
      storeForm: formReducer,
      storeFood: foodReducer,
      [getNutritionDataApi.reducerPath]: getNutritionDataApi.reducer,
   },
   middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(getNutritionDataApi.middleware)
   },
})

setupListeners(store.dispatch)

export * from './thunks/getFood'
export * from './thunks/getImage'

export {
   store,
   addIngredientData,
   addMeal,
   deleteIngredient,
   addRecipe,
   deleteRecipe,
   deleteAllRecipes,
   deleteAllMeal,
   getUserData,
   openUserData,
   deleteUserData,
   addRecipesLocalStorage,
   getUserBMI,
}
