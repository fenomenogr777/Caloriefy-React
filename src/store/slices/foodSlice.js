import { createSlice } from '@reduxjs/toolkit'

const foodSlice = createSlice({
   name: 'food',
   initialState: {
      ingredientData:  {
         calories: 0.513,
         carb: 0.049,
         fat: 0.019,
         id: '3nJXKFIAFfP543B4329RIsI',
         name: 'milk',
         protein: 0.035,
         serving: 100,
      },
      changedValue: '',
      meal: [
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFfHZ9R43TrIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJFIAFfPB956RTrIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 50.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nKFIAFfPB987RTrIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFfPB9T87rIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFfPB9RTrII8',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFf423PB9TrIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFfPBRTr432IsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
      ],
      recipes: [
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAB9RTr423IsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFB9RTr423IsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories:513,
            carb: 49,
            fat:19,
            id: '3nJXKFIAFfPB4329RIsI',
            name: 'milk',
            protein: 35,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFfPB4239rIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
         {
            calories: 0.513,
            carb: 0.049,
            fat: 0.019,
            id: '3nJXKFIAFB9RgfdTrIsI',
            name: 'milk',
            protein: 0.035,
            serving: 100,
         },
      ],
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
