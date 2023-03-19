import {
   Box,
   Button,
   IconButton,
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIngredient, addRecipe, deleteAllMeal } from '../store'
import useIsArray from '../hooks/useIsArray'
import { useState } from 'react'
import SnackBar from '../components/SnackBar'
import { DataGrid } from '@mui/x-data-grid'

function FoodSection() {
   const dispatch = useDispatch()
   // NAME OF THE RECIPE TO ADD
   const [recipeName, setRecipeName] = useState('')
   // SET THE SNACKBAR WHEN ADD RECIPE
   const [openSnackbar, setOpenSnackbar] = useState(false)

   // HANDLES
   const handleChange = e => {
      setRecipeName(e.target.value)
   }
   const handleCloseSnackbar = () => {
      setOpenSnackbar(false)
   }
   const handleDeleteIngredient = id => {
      dispatch(deleteIngredient(id))
   }
   // ADDS RECIPE
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

   // IMPORT MEAL/TOTAL/RECIPES
   const { meal, total, recipes } = useSelector(
      ({ storeFood: { meal, recipes } }) => {
         // if meal empty return empty arrays
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

   // SHOW THE LIST OF MEALS ON FOODSECTION
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

   // DATA GRID MEAL
   const columns = [
      { field: 'col1', headerName: 'Serving/Name', width: 150 },
      { field: 'col2', headerName: 'Calories', width: 70 },
      { field: 'col3', headerName: 'Protein', width: 70 },
      { field: 'col4', headerName: 'Carb', width: 70 },
      { field: 'col5', headerName: 'Fat', width: 70 },
   ]

   const rows = meal.map((meal, index) => {
      return {
         id: `${index + 999}`,
         col1: `${meal.serving}gr of ${meal.name}`,
         col2: `${meal.calories}`,
         col3: `${meal.protein}`,
         col4: `${meal.carb}`,
         col5: `${meal.fat}`,
      }
   })

   // JSX
   return (
      <Box
         height='320px'
         bgcolor='#fff'
         borderRadius='11px'
         display='flex'
         flexDirection='column'
         justifyContent='space-between'
      >
         {/* TITLE */}
         <Typography
            variant='subtitle2'
            color='#fff'
            bgcolor='primary.main'
            align='center'
            sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
         >
            FOOD
         </Typography>

         {/* LIST OF TOTAL AND MEALS */}
         {meal.length !== 0 ? (
            <Box
               height={350}
               display='flex'
               flexDirection='column'
               justifyContent='space-between'
            >
               <DataGrid
                  rows={rows}
                  columns={columns}
                  density='compact'
                  hideFooter
               />
               <Box
                  display='flex'
                  alignItems='center'
                  gap={2}
               >
                  <Typography
                     variant='h6'
                     color='primary'
                  >
                     TOTAL
                  </Typography>
                  <Typography>{total?.calories} Calories</Typography>
                  <Typography>{total?.protein} Protein</Typography>
                  <Typography>{total?.carb} Carb</Typography>
                  <Typography>{total?.fat} Fat</Typography>
               </Box>
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
            </Box>
         ) : (
            ''
         )}

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
