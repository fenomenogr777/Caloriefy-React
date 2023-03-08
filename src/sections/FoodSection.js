import { useContext, useState } from 'react'
import FoodContext from '../context/food'
import {
   Button,
   IconButton,
   TextField,
   Grid,
   Paper,
   List,
   ListItem,
   Divider,
   Typography,
   Stack,
} from '@mui/material'
import RandomKEY from '../components/RandomKey'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import { Box } from '@mui/system'

function FoodSection() {
   const [value, setValue] = useState('')
   const {
      state,
      addRecipeSection,
      clearTotalFood,
      deleteFoodById,
      totalNutrition,
   } = useContext(FoodContext)

   const handleChange = e => {
      setValue(e.target.value)
   }

   const deleteFood = e => {
      const clicked = e.target.closest('.foodOnFoodSection').id
      deleteFoodById(clicked)
      totalNutrition()
   }

   const renderedFoods = () => {
      const xxx = state.TotalFood.map(food => {
         return (
            <ListItem
               key={RandomKEY()}
               disablePadding
               sx={{ paddingLeft: '16px' }}>
               <Box
                  className='foodOnFoodSection'
                  id={food.id}
                  style={{
                     display: 'flex',
                     gap: '0.5rem',
                     alignItems: 'center',
                  }}>
                  <span>
                     {food.serving} gr of {food.name}
                  </span>
                  (<span>{food.calories}</span>
                  <span>{food.protein}</span>
                  <span>{food.carb}</span>
                  <span>{food.fat}</span>)
                  <IconButton
                     onClick={deleteFood}
                     variant='contained'
                     color='error'
                     size='small'>
                     <CancelIcon color={'error'} />
                  </IconButton>
               </Box>
            </ListItem>
         )
      })
      return xxx
   }

   const handleSubmit = e => {
      e.preventDefault()
      // GUARD NOT TO ADD WHEN TOTAL FOOD IS EMPTY
      if (state.TotalFood.length === 0) return
      addRecipeSection(value)
      clearTotalFood()
      console.log(state)
      setValue('')
   }

   return (
      <Stack
         direction='column'
         justifyContent='space-between'
         height={'21rem'}
         backgroundColor='#fff'
         borderRadius='11px'>
         <Box overflow='auto'>
            <Box
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
               color='#fff'
               variant='body2'
               align='center'
               width='100%'>
               {/* TITLOS */}
               <Typography
                  sx={{
                     borderTopLeftRadius: '9px',
                     borderTopRightRadius: '9px',
                  }}
                  bgcolor={'#4831d4'}
                  color='#fff'
                  variant='body2'
                  width='100%'
                  align='center'>
                  Food Data
               </Typography>
            </Box>

            <Box width='100%'>
               {/* TOTAL (1) */}

               <Box>
                  {state.TotalNutrition ? (
                     <Stack
                        direction='row'
                        gap={1}
                        justifyContent='space-evenly'>
                        <List disablePadding>
                           {/* <Typography variant='h6'>TOTAL</Typography> */}

                           <ListItem
                              disablePadding
                              sx={{ display: 'flex', gap: '1rem' }}>
                              <Typography variant='h6'>
                                 {state.TotalNutrition.calories}
                                 <Typography
                                    variant='overline'
                                    component='span'>
                                    &nbsp; Calories
                                 </Typography>
                              </Typography>
                              <Typography variant='h6'>
                                 {state.TotalNutrition.protein}
                                 <Typography
                                    variant='overline'
                                    component='span'>
                                    &nbsp; Protein
                                 </Typography>
                              </Typography>
                              <Typography variant='h6'>
                                 {state.TotalNutrition.carb}
                                 <Typography
                                    variant='overline'
                                    component='span'>
                                    &nbsp; Carb
                                 </Typography>
                              </Typography>
                              <Typography variant='h6'>
                                 {state.TotalNutrition.fat}
                                 <Typography
                                    variant='overline'
                                    component='span'>
                                    &nbsp; Fat
                                 </Typography>
                              </Typography>
                           </ListItem>
                        </List>
                     </Stack>
                  ) : (
                     ''
                  )}
               </Box>

               <Divider color='primary' />

               {/* RENDERED FOODS (2) */}
               <div>{renderedFoods()}</div>
            </Box>
         </Box>

         {/* FORM (3) */}

         {state.TotalNutrition ? (
            <form onSubmit={handleSubmit}>
               <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='flex-end'>
                  {/* TEXTFIELD(A) */}
                  <TextField
                     label='Recipe Name'
                     value={value}
                     onChange={handleChange}
                     size='small'
                     required
                  />
                  {/* BUTTON (B) */}
                  <Button
                     style={{ width: '-webkit-fill-available' }}
                     type='submit'
                     variant='contained'
                     color='primary'>
                     <AddCircleOutlineIcon />
                     Add Recipe
                  </Button>
               </Stack>
            </form>
         ) : (
            ''
         )}

         {/*  */}
      </Stack>
   )
}
export default FoodSection
