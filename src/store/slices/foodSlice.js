import { createSlice } from '@reduxjs/toolkit'
import { getFood } from '../thunks/getFood'
import { getImage } from '../thunks/getImage'

const foodSlice = createSlice({
   name: 'food',
   initialState: {
      images: {},
      ingredientData: {
         isLoading: false,
         data: {},
         error: null,
      },
      meal: [
         {
            calories: 51,
            carb: 5,
            fat: 2,
            id: 'gqFLy85atdpdcHfvgy_JI',
            name: 'milk',
            protein: 4,
            serving: 100,
            servingOriginal: 100,
         },
      ],
      recipes: [],
   },
   reducers: {
      addIngredientData(state, action) {
         state.ingredientData.data = action.payload
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
      addRecipesLocalStorage(state, action) {
         if (Array(action.payload) && action.payload.length >= 1) {
            state.recipes = action.payload
         }
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
   extraReducers(builder) {
      builder.addCase(getFood.pending, (state, _) => {
         state.ingredientData.isLoading = true
      })
      builder.addCase(getFood.fulfilled, (state, action) => {
         state.ingredientData.isLoading = false
         state.ingredientData.data = action.payload
         state.ingredientData.error = null
      })
      builder.addCase(getFood.rejected, (state, action) => {
         state.ingredientData.isLoading = false
         state.ingredientData.error = action.error
      })
      builder.addCase(getImage.pending, (state, action) => {})
      builder.addCase(getImage.fulfilled, (state, action) => {
         state.images = action.payload
      })
      builder.addCase(getImage.rejected, (state, action) => {})
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
   addRecipesLocalStorage,
} = foodSlice.actions

export const foodReducer = foodSlice.reducer
