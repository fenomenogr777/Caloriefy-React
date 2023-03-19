import { createSlice } from '@reduxjs/toolkit'
import { getFood } from '../thunks/getFood'

const foodSlice = createSlice({
   name: 'food',
   initialState: {
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
         // {
         //    calories: 51,
         //    carb: 5,
         //    fat: 2,
         //    id: 'gqFLy43242385atdpdcHfvgy_JI',
         //    name: 'water',
         //    protein: 4,
         //    serving: 100,
         //    servingOriginal: 100,
         // },
         // {
         //    calories: 51,
         //    carb: 5,
         //    fat: 2,
         //    id: 'gqFLy854545atdpdcHfvgy_JI',
         //    name: 'potato',
         //    protein: 4,
         //    serving: 100,
         //    servingOriginal: 100,
         // },
         // {
         //    calories: 51,
         //    carb: 5,
         //    fat: 2,
         //    id: '4343',
         //    name: 'cheese',
         //    protein: 4,
         //    serving: 100,
         //    servingOriginal: 100,
         // },
         // {
         //    calories: 51,
         //    carb: 5,
         //    fat: 2,
         //    id: 'gqFLy84345atdpdcHfvgy_JI',
         //    name: 'oats',
         //    protein: 4,
         //    serving: 100,
         //    servingOriginal: 100,
         // },
         // {
         //    calories: 51,
         //    carb: 5,
         //    fat: 2,
         //    id: 'gqFLy85at444dpdcHfvgy_JI',
         //    name: 'yoghurt',
         //    protein: 4,
         //    serving: 100,
         //    servingOriginal: 100,
         // },
      ],
      recipes: [
         // {
         //    calories: 51,
         //    carb: 50,
         //    fat: 20,
         //    id: '70E5E8KCj_sjtauQDmx',
         //    ingredients: ['milk-100gr', 'Yoghurt-80gr'],
         //    name: 'Proino',
         //    protein: 40,
         // },
         // {
         //    calories: 51,
         //    carb: 50,
         //    fat: 20,
         //    id: '70E5E8KCj_sjtuQDmx',
         //    ingredients: ['milk-100gr', 'Yoghurt-80gr'],
         //    name: 'Proino',
         //    protein: 40,
         // },
         // {
         //    calories: 51,
         //    carb: 50,
         //    fat: 20,
         //    id: '70E5E8KCj_sjgYuQDmx',
         //    ingredients: ['milk-100gr', 'Yoghurt-80gr'],
         //    name: 'Proino',
         //    protein: 40,
         // },
         // {
         //    calories: 51,
         //    carb: 50,
         //    fat: 20,
         //    id: '70E5ECj_sjtagYuQDmx',
         //    ingredients: ['milk-100gr', 'Yoghurt-80gr'],
         //    name: 'Proino',
         //    protein: 40,
         // },
         // {
         //    calories: 51,
         //    carb: 50,
         //    fat: 20,
         //    id: '70EKCj_sjtagYuQDmx',
         //    ingredients: ['milk-100gr', 'Yoghurt-80gr'],
         //    name: 'Proino',
         //    protein: 40,
         // },
      ],
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
