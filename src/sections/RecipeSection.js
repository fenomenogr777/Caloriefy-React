import {
   Box,
   Button,
   IconButton,
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
   deleteRecipe,
   deleteAllRecipes,
   addRecipesLocalStorage,
} from '../store'
import { useEffect, useState } from 'react'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import CancelIcon from '@mui/icons-material/Cancel'
import { nanoid } from '@reduxjs/toolkit'

function RecipeSection() {
   const dispatch = useDispatch()
   // GET THE VALUE FROM "showIngredientsById"
   const [open, setOpen] = useState(false)

   // SHOWS THE  CURRENT RECIPE BASED ON HIS ID
   const showIngredientsById = id => {
      setOpen(id)
      if (id === open) {
         setOpen(false)
      }
   }

   // HANDLES
   // const handleCloseIngredientList = e => {
   //    if (!e.target.classList.contains('.ingredient-list')) {
   //       setOpen(false)
   //    }
   //    console.log(1)
   // }

   const handleDeleteRecipe = id => {
      dispatch(deleteRecipe(id))
   }
   const handleDeleteAllRecipes = () => {
      dispatch(deleteAllRecipes())
   }

   const recipes = useSelector(({ storeFood: { recipes } }) => {
      return recipes
   })

   // LOAD RECIPES FROM LOCAL STORAGE
   useEffect(() => {
      let data = JSON.parse(window.localStorage.getItem('RECIPES_STORE')) || []
      if (data.length === 0) return
      const storedRecipes = data?.map(recipe => recipe)
      dispatch(addRecipesLocalStorage(storedRecipes))
   }, [dispatch])

   // SET RECIPES ON LOCAL STORAGE
   useEffect(() => {
      window.localStorage.setItem('RECIPES_STORE', JSON.stringify([...recipes]))
   }, [recipes])

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
         <Box>
            {/* TITLE */}
            <Typography
               variant='subtitle2'
               color='#fff'
               bgcolor='primary.main'
               align='center'
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
            >
               RECIPES
            </Typography>

            {/* RECIPES TABLE */}
            {recipes.length !== 0 && (
               <Box>
                  <TableContainer sx={{ maxHeight: '220px' }}>
                     <Table
                        size='small'
                        stickyHeader
                     >
                        <TableHead>
                           <TableRow>
                              <TableCell>NAME</TableCell>
                              <TableCell>CALORIES</TableCell>
                              <TableCell>PROTEIN</TableCell>
                              <TableCell>CARB</TableCell>
                              <TableCell>FAT</TableCell>
                              <TableCell>ITEMS</TableCell>
                              <TableCell></TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {recipes.map(recipe => {
                              return (
                                 <TableRow
                                    key={recipe.id}
                                    id={recipe.id}
                                 >
                                    <TableCell>{recipe.name}</TableCell>
                                    <TableCell>{recipe.calories}</TableCell>
                                    <TableCell>{recipe.protein}</TableCell>
                                    <TableCell>{recipe.carb}</TableCell>
                                    <TableCell>{recipe.fat}</TableCell>
                                    <TableCell position='relative'>
                                       <IconButton
                                          className='ingredient-list'
                                          {...(open === recipe.id
                                             ? {
                                                  color: 'secondary',
                                               }
                                             : { color: 'primary' })}
                                          onClick={() =>
                                             showIngredientsById(recipe.id)
                                          }
                                       >
                                          <RestaurantMenuIcon />
                                       </IconButton>

                                       {open === recipe.id && (
                                          <Box
                                             position='absolute'
                                             zIndex={999}
                                          >
                                             <Paper
                                                sx={{
                                                   backgroundColor: '#dad6f6',
                                                   padding: '4px 8px',
                                                }}
                                             >
                                                <Typography variant='h6'>
                                                   {recipe.name}
                                                </Typography>

                                                {recipe.ingredients.map(ing => {
                                                   return (
                                                      <Box key={nanoid()}>
                                                         <Typography>
                                                            {ing}
                                                         </Typography>
                                                      </Box>
                                                   )
                                                })}
                                             </Paper>
                                          </Box>
                                       )}
                                    </TableCell>
                                    <TableCell>
                                       <IconButton
                                          color='error'
                                          onClick={() =>
                                             handleDeleteRecipe(recipe.id)
                                          }
                                       >
                                          <CancelIcon />
                                       </IconButton>
                                    </TableCell>
                                 </TableRow>
                              )
                           })}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            )}
         </Box>
         {recipes.length !== 0 && (
            <Button
               size='small'
               variant='contained'
               color='error'
               onClick={handleDeleteAllRecipes}
               sx={{ alignSelf: 'center' }}
            >
               <Typography fontWeight='500'>Delete All</Typography>
            </Button>
         )}
      </Box>
   )
}
export default RecipeSection
