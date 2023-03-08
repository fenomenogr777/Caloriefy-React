import { useContext, useEffect, useState } from 'react'
import FoodContext from '../context/food'
import {
   TextField,
   Button,
   Grid,
   Box,
   List,
   ListItem,
   Typography,
   Stack,
   Divider,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function NutritionDataSection() {
   const [value, setValue] = useState('')
   const { state, updateOnChange, addFoodSection, totalNutrition } =
      useContext(FoodContext)

   // SET GRAMS TO 100 WHEN CURRENTFOOD CHANGE
   useEffect(() => {
      if (state.currentFood?.serving) {
         setValue(+state.currentFood?.serving)
      }
   }, [state.currentFood])

   // WHEN USER CLICKS BUTTON "ADD FOOD"
   const handleClickAddFood = e => {
      e.preventDefault()
      // GUARD IF NO DATA AND CLICK BUTTON AGAIN
      if (value === '') return
      addFoodSection()
      console.log(state)
      totalNutrition()
      setValue('')
   }

   const handleChange = e => {
      setValue(+e.target.value)
      updateOnChange(+e.target.value)
   }

   return (
      <Grid
         container
         display='flex'
         flexDirection='column'
         justifyContent='space-between'
         alignItems='center'
         height={'21rem'}
         backgroundColor='#fff'
         borderRadius='11px'>
         {/* KOUTI */}
         <Box width={'100%'}>
            {/* TITLOS BOX */}
            <Typography
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
               bgcolor={'#4831d4'}
               color='#fff'
               variant='body2'
               align='center'>
               Nutrition Data
            </Typography>

            {state.currentFood && (
               <Box sx={{ lineHeight: '2', width: '100%' }}>
                  <List>
                     <ListItem>
                        <Typography variant='h6'>
                           {`${state.currentFood.serving} gr of
                    ${state.currentFood.name}`}
                        </Typography>
                     </ListItem>
                     <Divider color='primary' />
                     <ListItem>
                        <Typography variant='body1'>
                           {state.currentFood.calories}
                        </Typography>
                     </ListItem>
                     <Divider color='primary' />
                     <ListItem>
                        <Typography variant='body1'>
                           {state.currentFood.protein}
                        </Typography>
                     </ListItem>
                     <Divider color='primary' />
                     <ListItem>
                        <Typography variant='body1'>
                           {state.currentFood.carb}
                        </Typography>
                     </ListItem>
                     <Divider color='primary' />
                     <ListItem>
                        <Typography variant='body1'>
                           {state.currentFood.fat}
                        </Typography>
                     </ListItem>
                     <Divider color='primary' />
                  </List>
               </Box>
            )}
         </Box>

         <Grid item>
            {state.currentFood && (
               <form
                  onSubmit={handleClickAddFood}
                  style={{ width: '100%' }}>
                  <Stack
                     direction='row'
                     width='100%'
                     justifyContent='flex-end'>
                     <TextField
                        type={'number'}
                        label='Serving Size (gr)'
                        value={value}
                        onChange={handleChange}
                        size='small'
                        color='primary'
                     />
                     <Button
                        style={{ width: '-webkit-fill-available' }}
                        type='submit'
                        width='inherit'
                        variant='contained'
                        color='primary'>
                        <AddCircleOutlineIcon /> Add Food
                     </Button>
                  </Stack>
               </form>
            )}
         </Grid>
      </Grid>
   )
}
export default NutritionDataSection
