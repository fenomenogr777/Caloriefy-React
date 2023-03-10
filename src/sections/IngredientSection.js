import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeIngredientValue, addMeal, resetIngredient } from '../store'

function IngredientSection() {
   const dispatch = useDispatch()

   const { ingredientData, changedValue } = useSelector(
      ({ storeFood: { ingredientData, changedValue } }) => {
         return {
            changedValue,
            ingredientData,
         }
      }
   )

   // SETS FIRST VALUE FOR THE INPUT THE INGSDATA.SERVING VALUE
   useEffect(() => {
      if (ingredientData.serving) {
         dispatch(changeIngredientValue(ingredientData.serving))
      }
   }, [dispatch, ingredientData.serving])

   // MODIFY ORIGINAL INGREDIENT DATA BASES ON USER INPUT VALUE
   const renderedData = {
      name: ingredientData.name,
      id: ingredientData.id,
      serving: changedValue,
      calories: Math.round((ingredientData.calories / 100) * changedValue),
      protein: Math.round((ingredientData.protein / 100) * changedValue),
      carb: Math.round((ingredientData.carb / 100) * changedValue),
      fat: Math.round((ingredientData.fat / 100) * changedValue),
   }

   const handleValueChange = e => {
      dispatch(changeIngredientValue(+e.target.value))
   }

   const handleSubmitIngredient = e => {
      e.preventDefault()
      dispatch(addMeal(renderedData))
      dispatch(resetIngredient())
      dispatch(changeIngredientValue(''))
   }

   return (
      <Box>
         {/* IF DATA OBJECT IS EMPTY NOT SHOW */}
         {Object.keys(ingredientData).length !== 0 ? (
            <Box>
               <Typography>{renderedData.calories}</Typography>
               <Typography>{renderedData.protein}</Typography>
               <Typography>{renderedData.carb}</Typography>
               <Typography>{renderedData.fat}</Typography>
            </Box>
         ) : (
            ''
         )}
         <form onSubmit={handleSubmitIngredient}>
            <TextField
               type='number'
               value={changedValue}
               onChange={handleValueChange}
            />
            <Button type='submit'>Add Ingredient</Button>
         </form>
      </Box>
   )
}
export default IngredientSection
