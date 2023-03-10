import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { resetMeal, addRecipe, addRecipeTitle } from '../store'

function FoodSection() {
   const state = useSelector(state => {
      return state
   })
   const dispatch = useDispatch()

   const { meal, recipeTitle } = useSelector(
      ({ storeFood: { meal, recipeTitle } }) => {
         return { meal, recipeTitle }
      }
   )

   console.log(state)
   console.log(meal)

   //  RENDER ALL MEALS TOTAL NUTRITIONS
   const { caloriesTotal, proteinTotal, carbTotal, fatTotal } = meal.reduce(
      (total, meal) => {
         total.caloriesTotal += meal.calories
         total.proteinTotal += meal.protein
         total.carbTotal += meal.carb
         total.fatTotal += meal.fat
         return total
      },
      { caloriesTotal: 0, proteinTotal: 0, carbTotal: 0, fatTotal: 0 }
   )

   //  RENDERS ALL MEALS
   const renderedMeals = meal.map(meal => {
      return (
         <Box key={meal.id}>
            <Typography>{meal.name}</Typography>
            <Typography>{meal.serving}</Typography>
            <Typography>{meal.calories}</Typography>
            <Typography>{meal.protein}</Typography>
            <Typography>{meal.carb}</Typography>
            <Typography>{meal.fat}</Typography>
         </Box>
      )
   })

   const handleCreateRecipe = () => {
      dispatch(
         addRecipe({
            name: recipeTitle,
            id: meal[0].id,
            calories: caloriesTotal,
            protein: proteinTotal,
            carb: carbTotal,
            fat: fatTotal,
            ingredients: meal.map(meal => `${meal.name} ${meal.serving}gr`),
         })
      )
      dispatch(resetMeal())
      dispatch(addRecipeTitle(''))
   }

   const handleChange = e => {
      dispatch(addRecipeTitle(e.target.value))
   }

   return (
      <Box>
         <Typography>
            TOTAL {caloriesTotal}//
            {proteinTotal}//
            {carbTotal}//
            {fatTotal}
         </Typography>

         {renderedMeals}
         <TextField
            value={recipeTitle}
            onChange={handleChange}
         />
         <Button onClick={handleCreateRecipe}>Create Recipe</Button>
      </Box>
   )
}
export default FoodSection
