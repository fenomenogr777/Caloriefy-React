import {
   Box,
   Button,
   IconButton,
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIngredient, addRecipe, deleteAllMeal } from '../store'
import useIsArray from '../hooks/useIsArray'
import { useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'

import SnackBar from '../components/SnackBar'

function FoodSection() {
   const [recipeName, setRecipeName] = useState('')
   const [openSnackbar, setOpenSnackbar] = useState(false)
   const dispatch = useDispatch()

   const { meal, total, recipes } = useSelector(
      ({ storeFood: { meal, recipes } }) => {
         // IF MEAL EMPTY RETURN EMPTY ARRAYS
         if (meal.length === 0) return { meal: [], total: [] }

         let storeFood = {
            recipes,
            meal,
            total: {
               calories: meal.reduce((total, meal) => {
                  return Math.round(total + meal?.calories)
               }, 0),
               protein: meal.reduce((total, meal) => {
                  return Math.round(total + meal?.protein)
               }, 0),
               carb: meal.reduce((total, meal) => {
                  return Math.round(total + meal?.carb)
               }, 0),
               fat: meal.reduce((total, meal) => {
                  return Math.round(total + meal?.fat)
               }, 0),
            },
         }

         return storeFood
      }
   )

   console.log(meal, total)

   const handleDeleteIngredient = id => {
      dispatch(deleteIngredient(id))
   }

   const renderedMeals = meal?.map(meal => {
      return (
         <Box key={meal.id}>
            <Stack
               direction='row'
               alignItems='center'
               gap={1}
            >
               <Typography
                  variant='h6'
                  textTransform='capitalize'
               >
                  {meal.name}
               </Typography>
               <Typography>{meal.serving}gr</Typography>

               <Typography variant='overline'>({meal.calories}C</Typography>
               <Typography variant='overline'>{meal.protein}P</Typography>
               <Typography variant='overline'>{meal.carb}C</Typography>
               <Typography variant='overline'>{meal.fat}F)</Typography>
               <IconButton onClick={() => handleDeleteIngredient(meal.id)}>
                  <ClearIcon color='error' />
               </IconButton>
            </Stack>
         </Box>
      )
   })

   const handleChange = e => {
      setRecipeName(e.target.value)
   }

   const handleCloseSnackbar = () => {
      setOpenSnackbar(false)
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
      setOpenSnackbar(true)

      console.log(...recipes)

      dispatch(deleteAllMeal())
      setRecipeName('')
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
         <Typography
            variant='subtitle2'
            color='#fff'
            bgcolor='primary.main'
            align='center'
            sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
         >
            FOOD
         </Typography>
         <Box
            padding='0 1rem'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
         >
            <Box>
               {useIsArray(
                  meal,
                  <Box>
                     <Stack
                        direction='row'
                        alignItems='center'
                        gap={1}
                     >
                        <Typography
                           variant='h6'
                           color='primary'
                        >
                           Total
                        </Typography>

                        <Typography>{total?.calories} </Typography>
                        <Typography variant='overline'>Calories</Typography>
                        <Typography>{total?.protein} protein</Typography>
                        <Typography>{total?.carb} carb</Typography>
                        <Typography>{total?.fat} fat</Typography>
                     </Stack>
                  </Box>
               )}
            </Box>
            <Box
               height='200px'
               bgcolor='#fff'
               sx={{ overflowY: 'auto' }}
            >
               <Box alignSelf='flex-start'>
                  {useIsArray(meal, renderedMeals)}
               </Box>
            </Box>
         </Box>
         <Box>
            {useIsArray(
               meal,

               <form
                  onSubmit={handleAddRecipe}
                  style={{ display: 'flex' }}
               >
                  <TextField
                     size='small'
                     label='Recipe Name'
                     value={recipeName}
                     onChange={handleChange}
                     required
                  />
                  <Button
                     variant='contained'
                     type='submit'
                  >
                     Add Recipe
                  </Button>
               </form>
            )}
         </Box>

         {/* SNACKBAR WHEN ADD RECIPE */}
         <SnackBar
            children={'Recipe Added succesfully'}
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            autoHideTime={2000}
         />
      </Box>
   )
}
export default FoodSection
