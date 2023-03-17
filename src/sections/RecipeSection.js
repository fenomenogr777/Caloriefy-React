import { Box, Button, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import { deleteRecipe, deleteAllRecipes } from '../store'
import ClearIcon from '@mui/icons-material/Clear'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/system'
import { addRecipe, addRecipesLocalStorage } from '../store'

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

   // LOAD RECIPES FROM LOCAL STORAGE IF EXIST
   useEffect(() => {
      let data = JSON.parse(window.localStorage.getItem('RECIPES_STORE')) || []
      console.log(data)
      if (data.length === 0) return
      const storedRecipes = data?.map(recipe => recipe)
      console.log(...storedRecipes)
      dispatch(addRecipesLocalStorage(storedRecipes))
   }, [dispatch])

   // SET RECIPES EVERYTIME THE ARRAY CHANGES
   useEffect(() => {
      window.localStorage.setItem('RECIPES_STORE', JSON.stringify([...recipes]))
   }, [recipes])

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
               <Typography variant='h6'>{recipe.name}</Typography>
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
               RECIPES
            </Typography>

            {useIsArray(recipes, renderedRecipes)}
         </Box>

         <Box>
            {useIsArray(
               recipes,
               <Button
                  size='small'
                  variant='contained'
                  color='error'
                  onClick={handleDeleteAllRecipes}
               >
                  <Typography fontWeight='500'>Delete All</Typography>
               </Button>
            )}
         </Box>
      </Box>
   )
}
export default RecipeSection
