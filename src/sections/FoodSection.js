import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIngredient, addRecipe, addMeal, deleteAllMeal } from '../store'
import useIsArray from '../hooks/useIsArray'
import { useState } from 'react'

function FoodSection() {
   const [recipeName, setRecipeName] = useState('')
   const dispatch = useDispatch()

   const { meal, total } = useSelector(({ storeFood: { meal } }) => {
      // IF MEAL EMPTY RETURN EMPTY ARRAYS
      if (meal.length === 0) return { meal: [], total: [] }

      let storeFood = {
         meal,
         total: {
            calories: meal.reduce((total, meal) => {
               return total + meal?.calories
            }, 0),
            protein: meal.reduce((total, meal) => {
               return total + meal?.protein
            }, 0),
            carb: meal.reduce((total, meal) => {
               return total + meal?.carb
            }, 0),
            fat: meal.reduce((total, meal) => {
               return total + meal?.fat
            }, 0),
         },
      }

      return storeFood
   })

   console.log(meal, total)

   const handleDeleteIngredient = id => {
      dispatch(deleteIngredient(id))
   }

   const renderedMeals = meal?.map(meal => {
      return (
         <Box key={meal.id}>
            <Typography>{meal.name}</Typography>
            <Typography>{meal.serving}</Typography>
            <Typography>{meal.calories}</Typography>
            <Typography>{meal.protein}</Typography>
            <Typography>{meal.carb}</Typography>
            <Typography>{meal.fat}</Typography>
            <Button onClick={() => handleDeleteIngredient(meal.id)}>
               delete
            </Button>
         </Box>
      )
   })

   const handleChange = e => {
      setRecipeName(e.target.value)
   }

   const handleAddRecipe = e => {
      e.preventDefault()
      dispatch(
         addRecipe({
            name: recipeName,
            id: meal[0].id,
            calories: total.calories,
            protein: total.protein,
            carb: total.carb,
            fat: total.fat,
            ingredients: meal.map(ing => `${ing.name}-${ing.serving}gr`),
         })
      )
      dispatch(deleteAllMeal())
      setRecipeName('')
   }

   return (
      <Box>
         {useIsArray(meal, <Box> TOTAL = {total?.calories}</Box>)}
         {useIsArray(meal, renderedMeals)}
         {useIsArray(
            meal,
            <form onSubmit={handleAddRecipe}>
               <TextField
                  label='recipe name'
                  value={recipeName}
                  onChange={handleChange}
               />
               <Button type='submit'>Add Recipe</Button>
            </form>
         )}
      </Box>
   )
}
export default FoodSection
