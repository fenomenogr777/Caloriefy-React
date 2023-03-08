import { useContext } from 'react'
import FoodContext from '../context/food'
import RandomKey from '../components/RandomKey'
import {
   Button,
   IconButton,
   Grid,
   Box,
   Stack,
   Typography,
   Collapse,
   List,
   ListItem,
   Divider,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useState } from 'react'

function RecipeSection() {
   const [open, setOpen] = useState(false)
   const { state, deleteRecipeById, deleteAllRecipes } = useContext(FoodContext)

   console.log(state)

   console.log(state)
   const deleteRecipe = e => {
      const clicked = e.target.closest('.recipeOnRecipeSection').id
      deleteRecipeById(clicked)
   }

   const handledeleteAllRecipes = e => {
      deleteAllRecipes()
   }

   const renderedRecipes = () => {
      return state.Recipes.map(recipe => {
         return (
            <Box
               id={recipe.id}
               className='recipeOnRecipeSection'
               key={RandomKey()}>
               <Stack
                  direction='row'
                  alignItems='baseline'
                  gap={1}>
                  <List>
                     <ListItem>
                        <Typography
                           variant='h6'
                           component='span'>
                           {recipe.RecipeName}
                        </Typography>
                        <Stack
                           direction='row'
                           alignItems='end'
                           gap={1}>
                           <Typography
                              variant='span'
                              component='span'>
                              {recipe.TotalNutrition.calories}
                              <Typography
                                 variant='subtitle2'
                                 component='span'>
                                 Calories
                              </Typography>
                           </Typography>
                           <Typography
                              variant='span'
                              component='span'>
                              {recipe.TotalNutrition.protein}
                              <Typography
                                 variant='subtitle2'
                                 component='span'>
                                 Protein
                              </Typography>
                           </Typography>
                           <Typography
                              variant='span'
                              component='span'>
                              {recipe.TotalNutrition.carb}
                              <Typography
                                 variant='subtitle2'
                                 component='span'>
                                 Carb
                              </Typography>
                           </Typography>
                           <Typography
                              variant='span'
                              component='span'>
                              {recipe.TotalNutrition.fat}
                              <Typography
                                 variant='subtitle2'
                                 component='span'>
                                 Fat
                              </Typography>
                           </Typography>
                        </Stack>
                     </ListItem>
                     <Divider color='primary' />
                  </List>

                  <Button onClick={() => setOpen(!open)}>Ingredients</Button>
                  {recipe.ingredient.map(ing => {
                     return (
                        <Box key={RandomKey()}>
                           <Collapse in={open}>
                              <Typography
                                 variant='span'
                                 key={RandomKey()}>
                                 {ing.name}
                              </Typography>
                           </Collapse>
                        </Box>
                     )
                  })}

                  <IconButton
                     onClick={deleteRecipe}
                     variant='contained'
                     size='small'>
                     <CancelIcon color={'error'} />
                  </IconButton>
               </Stack>
            </Box>
         )
      })
   }

   return (
      <Stack
         direction='column'
         justifyContent='space-between'
         height={'21rem'}
         backgroundColor='#fff'
         borderRadius='11px'>
         <Box
            width='100%'
            overflow='auto'>
            {/* TITLOS */}
            <Typography
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
               bgcolor={'#4831d4'}
               color='#fff'
               variant='body2'
               align='center'>
               Recipes
            </Typography>
            {/* RENDERED RECIPES LIST */}
            <Box>{renderedRecipes()}</Box>
         </Box>

         {/* DELETEALL BUTTON */}
         {state.Recipes.length > 0 && (
            <Box>
               <Button
                  onClick={handledeleteAllRecipes}
                  variant='contained'
                  color='error'
                  size='small'>
                  Delete ALL
               </Button>
            </Box>
         )}
      </Stack>
   )
}
export default RecipeSection
