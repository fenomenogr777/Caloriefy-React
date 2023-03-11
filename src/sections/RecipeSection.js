import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import { deleteRecipe, deleteAllRecipes } from '../store'

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
            <Button
               color='error'
               onClick={() => handleDeleteRecipe(recipe.id)}
            >
               delete
            </Button>
         </Box>
      )
   })

   return (
      <Box>
         {useIsArray(recipes, renderedRecipes)}
         {useIsArray(
            recipes,
            <Button onClick={handleDeleteAllRecipes}>Delete All</Button>
         )}
      </Box>
   )
}
export default RecipeSection
