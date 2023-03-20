import {
   Alert,
   AlertTitle,
   Box,
   Button,
   CircularProgress,
   Link,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
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
   const { ingredientData, error, isLoading, images } = useSelector(
      ({
         storeFood: {
            images,
            ingredientData: { data, error, isLoading },
         },
      }) => {
         // changes ingredient data based on input value
         const ingredientData = {
            name: `${data?.name?.slice(0, 1).toUpperCase()}${data?.name
               ?.slice(1)
               .toLowerCase()}`,
            id: data?.id,
            calories: Math.round(data?.calories * value),
            protein: Math.round(data?.protein * value),
            carb: Math.round(data?.carb * value),
            fat: Math.round(data?.fat * value),
            serving: +value,
            servingOriginal: data?.serving,
         }
         return { ingredientData, error, isLoading, images }
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
            {!error && !isLoading && ingredientData?.id && (
               <Box position='relative'>
                  {/* TABLE DATA */}
                  <TableContainer>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell>Serving/Name</TableCell>
                              <TableCell>Calories</TableCell>
                              <TableCell>Protein</TableCell>
                              <TableCell>Carb</TableCell>
                              <TableCell>Fat</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell>
                                 {ingredientData?.serving}gr of {''}
                                 {ingredientData?.name}
                              </TableCell>
                              <TableCell>{ingredientData?.calories}</TableCell>
                              <TableCell>{ingredientData?.protein}</TableCell>
                              <TableCell>{ingredientData?.carb}</TableCell>
                              <TableCell>{ingredientData?.fat}</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </TableContainer>

                  {/* IMAGES FROM API BASES ON SEARCH QUERY */}
                  <Link
                     target='_blank'
                     href={images}
                  >
                     <img
                        src={images}
                        height={100}
                        width={100}
                        alt='search_image'
                        align='center'
                        style={{
                           borderRadius: '50%',
                           position: 'absolute',
                           left: '50%',
                           transform: 'translate(-50%,0)',
                           border: '3px solid rgb(72, 49, 212)',
                        }}
                     />
                  </Link>
               </Box>
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
                  size='small'
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
