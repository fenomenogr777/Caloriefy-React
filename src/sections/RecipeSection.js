import {
   Badge,
   Box,
   Button,
   IconButton,
   Popover,
   Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import {
   deleteRecipe,
   deleteAllRecipes,
   addRecipesLocalStorage,
} from '../store'
import ClearIcon from '@mui/icons-material/Clear'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/system'

function RecipeSection() {
   const dispatch = useDispatch()
   // GET THE VALUE FROM "showIngredientsById"
   const [open, setOpen] = useState('')

   // SHOWS THE  CURRENT RECIPE BASED ON HIS ID
   const showIngredientsById = id => {
      setOpen(id)
      if (id === open) {
         setOpen('')
      }
   }

   // HANDLES
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



   // LIST OF RECIPES
   const renderedRecipes = recipes?.map(recipe => {
      return (
         <Box key={recipe.id}>
            <Stack
               direction='row'
               alignItems='center'
               gap={1}
            >
               <Box>
                  <Typography
                     fontWeight={500}
                     color='success'
                     variant='h5'
                     textTransform='Capitalize'
                  >
                     {recipe.name}
                  </Typography>
               </Box>
               <Typography>(</Typography>
               {/* CALORIES BOX */}
               <Box
                  display='flex'
                  gap={0.5}
                  alignItems='baseline'
               >
                  <Typography
                     variant='body1'
                     fontWeight={600}
                     color='secondary.dark'
                  >
                     {recipe.calories}
                  </Typography>
                  <Typography
                     variant='caption'
                     fontWeight={600}
                  >
                     Calories
                  </Typography>
               </Box>

               <Box
                  display='flex'
                  gap={0.5}
                  alignItems='baseline'
               >
                  <Typography
                     variant='body1'
                     fontWeight={600}
                     color='secondary.dark'
                  >
                     {recipe.protein}
                  </Typography>
                  <Typography
                     variant='caption'
                     fontWeight={600}
                  >
                     Protein
                  </Typography>
               </Box>

               <Box
                  display='flex'
                  gap={0.5}
                  alignItems='baseline'
               >
                  <Typography
                     variant='body1'
                     fontWeight={600}
                     color='secondary.dark'
                  >
                     {recipe.carb}
                  </Typography>
                  <Typography
                     variant='caption'
                     fontWeight={600}
                  >
                     Carb
                  </Typography>
               </Box>

               <Box
                  display='flex'
                  gap={0.5}
                  alignItems='baseline'
               >
                  <Typography
                     variant='body1'
                     fontWeight={600}
                     color='secondary.dark'
                  >
                     {recipe.fat}
                  </Typography>
                  <Typography
                     variant='caption'
                     fontWeight={600}
                  >
                     Fat
                  </Typography>
               </Box>
               <Typography>)</Typography>

               <IconButton
                  // SHOWS INGREDIENTS
                  onClick={() => showIngredientsById(recipe.id)}
                  color='primary'
               >
                  <Badge
                     badgeContent={recipe.ingredients.length}
                     color='secondary'
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                     }}
                  >
                     <LocalDiningIcon />
                  </Badge>
               </IconButton>

               <Box>
                  {open === recipe.id
                     ? recipe?.ingredients?.map((ing, index) => ing)
                     : // recipe?.ingredients?.map((ing, index) => ing)
                       ''}
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
