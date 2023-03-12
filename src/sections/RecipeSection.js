import {
   Box,
   Button,
   ButtonGroup,
   Dialog,
   IconButton,
   Menu,
   MenuItem,
   Modal,
   Popover,
   Popper,
   Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import { deleteRecipe, deleteAllRecipes } from '../store'
import ClearIcon from '@mui/icons-material/Clear'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import { useState } from 'react'
import { Stack } from '@mui/system'

function RecipeSection() {
   const [open, setOpen] = useState('false')

   const showIngredientsById = id => {
      setOpen(id)
      if (id === open) {
         setOpen('')
      }
   }

   const dispatch = useDispatch()
   const state = useSelector(state => state)
   console.log(state)

   const recipes = useSelector(({ storeFood: { recipes } }) => {
      return recipes
   })
   console.log(recipes)

   const handleDeleteRecipe = id => {
      dispatch(deleteRecipe(id))
   }
   const handleDeleteAllRecipes = () => {
      dispatch(deleteAllRecipes())
   }

   const renderedRecipes = recipes?.map(recipe => {
      return (
         <Box key={recipe.id}>
            <Stack
               direction='row'
               alignItems='center'
               gap={1}
            >
               <Typography>{recipe.name}</Typography>
               <Typography>{recipe.calories}</Typography>
               <Typography>{recipe.protein}</Typography>
               <Typography>{recipe.carb}</Typography>
               {/* ING */}
               <IconButton
                  onClick={() => showIngredientsById(recipe.id)}
                  color='primary'
               >
                  <LocalDiningIcon />
               </IconButton>

               <Box>
                  {open === recipe.id
                     ? recipe?.ingredients?.map((ing, index) => ing)
                     : ''}
               </Box>

               <IconButton
                  color='error'
                  onClick={() => handleDeleteRecipe(recipe.id)}
               >
                  <ClearIcon />
               </IconButton>
            </Stack>
         </Box>
      )
   })

   return (
      <Box
         padding='1rem'
         height='300px'
         bgcolor='#fff'
         borderRadius='11px'
      >
         {useIsArray(recipes, renderedRecipes)}
         {useIsArray(
            recipes,
            <Button
               variant='contained'
               color='error'
               onClick={handleDeleteAllRecipes}
            >
               <Typography fontWeight='500'>Delete All</Typography>
            </Button>
         )}
      </Box>
   )
}
export default RecipeSection
