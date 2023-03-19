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
import {
   DataGrid,
   GridAddIcon,
   GridArrowUpwardIcon,
   GridOverlay,
   GridSeparatorIcon,
} from '@mui/x-data-grid'

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
   // const renderedRecipes = recipes?.map(recipe => {
   //    return (
   //       <Box key={recipe.id}>
   //          <Stack
   //             direction='row'
   //             alignItems='center'
   //             gap={1}
   //          >
   //             <Box>

   //                <Typography
   //                   fontWeight={500}
   //                   color='success'
   //                   variant='h5'
   //                   textTransform='Capitalize'
   //                >
   //                   {recipe.name}
   //                </Typography>
   //             </Box>
   //             <Typography>(</Typography>

   //             <Box
   //                display='flex'
   //                gap={0.5}
   //                alignItems='baseline'
   //             >
   //                <Typography
   //                   variant='body1'
   //                   fontWeight={600}
   //                   color='secondary.dark'
   //                >
   //                   {recipe.calories}
   //                </Typography>
   //                <Typography
   //                   variant='caption'
   //                   fontWeight={600}
   //                >
   //                   Calories
   //                </Typography>
   //             </Box>

   //             <Box
   //                display='flex'
   //                gap={0.5}
   //                alignItems='baseline'
   //             >
   //                <Typography
   //                   variant='body1'
   //                   fontWeight={600}
   //                   color='secondary.dark'
   //                >
   //                   {recipe.protein}
   //                </Typography>
   //                <Typography
   //                   variant='caption'
   //                   fontWeight={600}
   //                >
   //                   Protein
   //                </Typography>
   //             </Box>

   //             <Box
   //                display='flex'
   //                gap={0.5}
   //                alignItems='baseline'
   //             >
   //                <Typography
   //                   variant='body1'
   //                   fontWeight={600}
   //                   color='secondary.dark'
   //                >
   //                   {recipe.carb}
   //                </Typography>
   //                <Typography
   //                   variant='caption'
   //                   fontWeight={600}
   //                >
   //                   Carb
   //                </Typography>
   //             </Box>

   //             <Box
   //                display='flex'
   //                gap={0.5}
   //                alignItems='baseline'
   //             >
   //                <Typography
   //                   variant='body1'
   //                   fontWeight={600}
   //                   color='secondary.dark'
   //                >
   //                   {recipe.fat}
   //                </Typography>
   //                <Typography
   //                   variant='caption'
   //                   fontWeight={600}
   //                >
   //                   Fat
   //                </Typography>
   //             </Box>
   //             <Typography>)</Typography>

   //             <IconButton

   //                onClick={() => showIngredientsById(recipe.id)}
   //                color='primary'
   //             >
   //                <Badge
   //                   badgeContent={recipe.ingredients.length}
   //                   color='secondary'
   //                   anchorOrigin={{
   //                      vertical: 'bottom',
   //                      horizontal: 'right',
   //                   }}
   //                >
   //                   <LocalDiningIcon />
   //                </Badge>
   //             </IconButton>

   //             <Box>
   //                {open === recipe.id
   //                   ? recipe?.ingredients?.map((ing, index) => ing)
   //                   : // recipe?.ingredients?.map((ing, index) => ing)
   //                     ''}
   //             </Box>

   //             <IconButton
   //                color='error'
   //                onClick={() => handleDeleteRecipe(recipe.id)}
   //             >
   //                <ClearIcon />
   //             </IconButton>
   //          </Stack>
   //       </Box>
   //    )
   // })

   const renderedRecipes = recipes.map((recipe, index) => recipe.name)

   // DATAGRID RECIPES
   const columns = [
      { field: 'col1', headerName: 'Name', width: 150 },
      { field: 'col2', headerName: 'Calories', width: 70 },
      { field: 'col3', headerName: 'Protein', width: 70 },
      { field: 'col4', headerName: 'Carb', width: 70 },
      { field: 'col5', headerName: 'Fat', width: 70 },
      { field: 'col6', headerName: 'Ingredients', width: 130 },
   ]

   const rows = recipes.map((recipe, index) => {
      return {
         id: `${index}`,
         col1: `${recipe.name}`,
         col2: `${recipe.calories}`,
         col3: `${recipe.protein}`,
         col4: `${recipe.carb}`,
         col5: `${recipe.fat}`,
         col6: `${recipe.ingredients.map(ing => ing)}`,
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
            RECIPES
         </Typography>
         {/* DATAGRID BOX */}
         {recipes.length !== 0 ? (
            <Box
               height='400px'
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

               <Button
                  size='small'
                  variant='contained'
                  color='error'
                  onClick={handleDeleteAllRecipes}
                  sx={{ alignSelf: 'center' }}
               >
                  <Typography fontWeight='500'>Delete All</Typography>
               </Button>
            </Box>
         ) : (
            ''
         )}
      </Box>
   )
}
export default RecipeSection
