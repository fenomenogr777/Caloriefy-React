import { createSlice } from '@reduxjs/toolkit'

const foodSlice = createSlice({
   name: 'food',
   initialState: {
      ingredientData: {},
      changedValue: '',
      meal: [],
      recipeTitle: '',
      recipes: [],
   },
   reducers: {
      addIngredient(state, action) {
         state.ingredientData = action.payload
      },
      resetIngredient(state, action) {
         state.ingredientData = {}
      },
      addMeal(state, action) {
         state.meal.push(action.payload)
      },
      addRecipeTitle(state, action) {
         state.recipeTitle = action.payload
      },
      resetMeal(state, action) {
         state.meal = []
      },
      changeIngredientValue(state, action) {
         state.changedValue = action.payload
      },
      addRecipe(state, action) {
         state.recipes.push(action.payload)
      },
      removeIngredient(state, action) {},
      removeRecipe(state, action) {},
      removeAllRecipe(state, action) {},
   },
})

export const {
   addIngredient,
   changeIngredientValue,
   removeIngredient,
   addRecipe,
   removeRecipe,
   removeAllRecipes,
   addMeal,
   resetMeal,
   resetIngredient,addRecipeTitle
} = foodSlice.actions

export const foodReducer = foodSlice.reducer
