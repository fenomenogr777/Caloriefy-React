import { Box, Button, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import { deleteRecipe, deleteAllRecipes } from '../store'
import ClearIcon from '@mui/icons-material/Clear'

function RecipeSection() {
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
            <Typography>{recipe.name}</Typography>
            <Typography>{recipe.calories}</Typography>
            <Typography>{recipe.protein}</Typography>
            <Typography>{recipe.carb}</Typography>
            <IconButton
               color='error'
               onClick={() => handleDeleteRecipe(recipe.id)}
            >
               <ClearIcon />
            </IconButton>
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
         hhg
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
