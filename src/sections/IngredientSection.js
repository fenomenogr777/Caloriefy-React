import {
   Box,
   Button,
   Divider,
   List,
   ListItem,
   TextField,
   Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMeal, addIngredientData } from '../store'
import useIsObject from '../hooks/useIsObject'

function IngredientSection() {
   const [value, setValue] = useState(100)

   const dispatch = useDispatch()

   // GET INGREDIENTDATA FROM REDUX
   const ingredientData = useSelector(
      ({
         storeFood: {
            ingredientData: { data },
         },
      }) => {
         console.log(data)
         if (data.name === 'Error') {
            return { name: data.name, message: data.message, error: true }
         }

         // CHANGE INGREDIENT DATA BASED ON INPUT VALUE
         const ingredientData = {
            name: data?.name,
            id: data?.id,
            calories: Math.round(data?.calories * value),
            protein: Math.round(data?.protein * value),
            carb: Math.round(data?.carb * value),
            fat: Math.round(data?.fat * value),
            serving: +value,
            servingOriginal: data?.serving,
         }
         return ingredientData
      }
   )
   console.log(ingredientData)
   
   const handleChange = e => {
      setValue(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()
      dispatch(addMeal(ingredientData))
      dispatch(addIngredientData({}))
      setValue(100)
   }
   return (
      <Box
         height='320px'
         bgcolor='#fff'
         borderRadius='11px'
         display='flex'
         flexDirection='column'
         justifyContent='space-between'
      >
         <Box>
            <Typography
               variant='subtitle2'
               color='#fff'
               bgcolor='primary.main'
               align='center'
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
            >
               INGREDIENT
            </Typography>

            {/* LIST */}

            {ingredientData?.name && (
               <List>
                  <ListItem>
                     <Typography>
                        {ingredientData?.serving}gr of {ingredientData?.name}
                     </Typography>
                  </ListItem>
                  <Divider color='purple' />
                  <Typography>Calories: {ingredientData?.calories}</Typography>
                  <Divider />
                  <Typography>Protein: {ingredientData?.protein}</Typography>
                  <Divider />
                  <Typography>Carb: {ingredientData?.carb}</Typography>
                  <Divider />
                  <Typography>Fat: {ingredientData?.fat}</Typography>
                  <Divider />
               </List>
            )}
         </Box>
         {/* FORM */}
         {ingredientData?.name && (
            <form
               onSubmit={handleSubmit}
               style={{ display: 'flex' }}
            >
               <TextField
                  label='Serving (gr)'
                  size='small'
                  type='number'
                  value={value}
                  onChange={handleChange}
               />
               <Button
                  variant='contained'
                  type='submit'
               >
                  Add ingredient
               </Button>
            </form>
         )}
      </Box>
   )
}

export default IngredientSection
