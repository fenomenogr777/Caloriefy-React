import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMeal, addIngredientData } from '../store'
import useIsObject from '../hooks/useIsObject'

function IngredientSection() {
   const [value, setValue] = useState('')

   const dispatch = useDispatch()

   const ingredientData = useSelector(({ storeFood: { ingredientData } }) => {
      if (Object.keys(ingredientData).length === 0) return {}

      ingredientData = {
         name: ingredientData?.name,
         id: ingredientData?.id,
         calories: ingredientData?.calories * value,
         protein: ingredientData?.protein * value,
         carb: ingredientData?.carb * value,
         fat: ingredientData?.fat * value,
         serving: +value,
         servingOriginal: ingredientData?.serving,
      }

      return ingredientData
   })

   console.log(ingredientData)
   const handleChange = e => {
      setValue(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()
      dispatch(addMeal(ingredientData))
      dispatch(addIngredientData({}))
      setValue('')
   }

   return (
      <Box>
         {useIsObject(
            ingredientData,
            <Box>
               <Box>{ingredientData.calories}</Box>
               <form onSubmit={handleSubmit}>
                  <TextField
                     type='number'
                     value={value}
                     onChange={handleChange}
                  />
                  <Button type='submit'>Add ingredient</Button>
               </form>
            </Box>
         )}
      </Box>
   )
}
export default IngredientSection
