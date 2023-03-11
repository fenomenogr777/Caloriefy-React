import { createSlice } from '@reduxjs/toolkit'

const foodSlice = createSlice({
   name: 'food',
   initialState: {
      ingredientData: {},
      changedValue: '',
      meal: [],
      recipes: [],
   },
   reducers: {
      addIngredientData(state, action) {
         state.ingredientData = action.payload
      },
      addMeal(state, action) {
         state.meal.push(action.payload)
      },

      deleteAllMeal(state, _) {
         state.meal = []
      },
      deleteIngredient(state, action) {
         state.meal = state.meal.filter(meal => {
            return meal.id !== action.payload
         })
      },
      addRecipe(state, action) {
         state.recipes.push(action.payload)
      },
      deleteRecipe(state, action) {
         state.recipes = state.recipes.filter(recipe => {
            return recipe.id !== action.payload
         })
      },
      deleteAllRecipes(state, _) {
         state.recipes = []
      },
   },
})

export const {
   addIngredientData,
   addMeal,
   deleteIngredient,
   addRecipe,
   deleteRecipe,
   deleteAllRecipes,
   deleteAllMeal,
} = foodSlice.actions

export const foodReducer = foodSlice.reducer
