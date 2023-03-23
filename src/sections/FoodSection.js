import {
   Box,
   Button,
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIngredient, addRecipe, deleteAllMeal } from '../store'
import { useState } from 'react'
import SnackBar from '../components/SnackBar'
import CancelIcon from '@mui/icons-material/Cancel'
import { nanoid } from '@reduxjs/toolkit'

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
   const handleDeleteIngredient = e => {
      const id = e.target.closest('.MuiTableRow-root').id
      dispatch(deleteIngredient(id))
   }
   // ADDS RECIPE
   const handleAddRecipe = e => {
      e.preventDefault()
      dispatch(
         addRecipe({
            name: recipeName,
            id: nanoid(),
            calories: total.calories,
            protein: total.protein,
            carb: total.carb,
            fat: total.fat,
            ingredients: meal.map(
               (ing, index) => `${index + 1}: ${ing.name} ${ing.serving}gr`
            ),
         })
      )
      setOpenSnackbar(true)
      dispatch(deleteAllMeal())
      setRecipeName('')
   }

   // IMPORT MEAL/TOTAL/RECIPES
   const { meal, total } = useSelector(({ storeFood: { meal } }) => {
      // if meal empty return empty arrays
      if (meal.length === 0) return { meal: [], total: [] }

      let storeFood = {
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
               <TableContainer sx={{ maxHeight: '220px' }}>
                  <Table
                     size='small'
                     stickyHeader
                  >
                     <TableHead>
                        <TableRow>
                           <TableCell>Serving/Name</TableCell>
                           <TableCell>Calories</TableCell>
                           <TableCell>Protein</TableCell>
                           <TableCell>Carb</TableCell>
                           <TableCell>Fat</TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {/* MEALS TABLE */}
                        {meal.map(meal => {
                           return (
                              <TableRow
                                 key={meal.id}
                                 id={meal.id}
                              >
                                 <TableCell>
                                    {meal.serving}gr of {meal.name}
                                 </TableCell>
                                 <TableCell>{meal.calories}</TableCell>
                                 <TableCell>{meal.protein}</TableCell>
                                 <TableCell>{meal.carb}</TableCell>
                                 <TableCell>{meal.fat}</TableCell>
                                 <TableCell>
                                    {
                                       <IconButton
                                          onClick={handleDeleteIngredient}
                                          color='error'
                                       >
                                          <CancelIcon />
                                       </IconButton>
                                    }
                                 </TableCell>
                              </TableRow>
                           )
                        })}
                     </TableBody>
                  </Table>
               </TableContainer>

               {/* TOTAL TABLE */}
               <Box>
                  <TableContainer>
                     <Table size='small'>
                        <TableHead>
                           <TableRow>
                              <TableCell>TOTAL</TableCell>
                              <TableCell>{total?.calories}</TableCell>
                              <TableCell>{total?.protein}</TableCell>
                              <TableCell>{total?.carb}</TableCell>
                              <TableCell>{total?.fat}</TableCell>
                              <TableCell></TableCell>
                           </TableRow>
                        </TableHead>
                     </Table>
                  </TableContainer>

                  {/* FORM */}
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
            </Box>
         ) : (
            ''
         )}

         {/* SNACKBAR WHEN ADD RECIPE */}
         <SnackBar
            children={'Recipe Added succesfully'}
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            autoHideTime={3000}
         />
      </Box>
   )
}
export default FoodSection
