import {
   Alert,
   AlertTitle,
   Box,
   Button,
   CircularProgress,
   Divider,
   List,
   ListItem,
   TextField,
   Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMeal, addIngredientData } from '../store'

function IngredientSection() {
   const dispatch = useDispatch()

   // SERVING VALUE - DEFAULT TO 100gr
   const [value, setValue] = useState(100)

   // GET INGREDIENTDATA FROM REDUX
   const { ingredientData, error, isLoading } = useSelector(
      ({
         storeFood: {
            ingredientData: { data, error, isLoading },
         },
      }) => {
         // changes ingredient data based on input value
         const ingredientData = {
            name: data?.name,
            id: data?.id,
            calories: Math.round(data?.calories * value),
            protein: Math.round(data?.protein * value),
            carb: Math.round(data?.carb * value),
            fat: Math.round(data?.fat * value),
            serving: +value,
            servingOriginal: data?.serving,
         }
         return { ingredientData, error, isLoading }
      }
   )

   // HANDLES
   const handleChange = e => {
      setValue(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()
      // add ingredient to meals array
      dispatch(addMeal(ingredientData))
      // empty ingredient data
      dispatch(addIngredientData({}))
      // set default serving value to 100gr
      setValue(100)
   }

   // JSX
   return (
      <Box
         height='320px'
         bgcolor='#fff'
         borderRadius='11px'
         display='flex'
         flexDirection='column'
         justifyContent='space-between'
         position='relative'
      >
         <Box>
            {/* SECTION TITLE */}
            <Typography
               variant='subtitle2'
               color='#fff'
               bgcolor='primary.main'
               align='center'
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
            >
               INGREDIENT
            </Typography>

            {/* WHEN LOADING SHOWING LOAD ICON */}
            {isLoading && (
               <Box
                  position='absolute'
                  right='50%'
                  bottom='50%'
                  sx={{ transform: 'translate(50%,50%)' }}
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  gap={2}
               >
                  <CircularProgress color='primary' />

                  <Typography
                     color='primary'
                     variant='h6'
                  >
                     Loading...
                  </Typography>
               </Box>
            )}

            {/* WHEN GET ERROR SHOW ERROR MESSAGE */}
            {!isLoading && error && (
               <Box>
                  <Alert severity='warning'>
                     <AlertTitle>Warning</AlertTitle>
                     {error.message}
                  </Alert>
               </Box>
            )}

            {/* WHEN GET DATA -SHOW LIST OF DATA*/}
            {!error && !isLoading && ingredientData?.name && (
               <List>
                  <ListItem>
                     <Typography>
                        {ingredientData?.serving}gr of {ingredientData?.name}
                     </Typography>
                  </ListItem>
                  <Divider color='purple' />
                  <Typography>Calories: {ingredientData?.calories}</Typography>
                  <Divider />
                  <Typography>Protein: {ingredientData?.protein}</Typography>
                  <Divider />
                  <Typography>Carb: {ingredientData?.carb}</Typography>
                  <Divider />
                  <Typography>Fat: {ingredientData?.fat}</Typography>
                  <Divider />
               </List>
            )}
         </Box>

         {/* FORM */}
         {!error && !isLoading && ingredientData?.name && (
            <form
               onSubmit={handleSubmit}
               style={{ display: 'flex' }}
            >
               <TextField
                  label='Serving (gr)'
                  size='small'
                  type='number'
                  value={value}
                  onChange={handleChange}
               />
               <Button
                  variant='contained'
                  type='submit'
               >
                  Add ingredient
               </Button>
            </form>
         )}
      </Box>
   )
}

export default IngredientSection
