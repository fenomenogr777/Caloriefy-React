import {
   Box,
   Button,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openUserData, deleteUserData, getUserBMI, getUserData } from '../store'

function UserSection() {
   const dispatch = useDispatch()

   // GET TOTAL DATA FROM RECIPES
   const totalNutrition = useSelector(({ storeFood: { recipes } }) => {
      return recipes.reduce(
         (total, recipe) => {
            total.calories += recipe.calories
            total.protein += recipe.protein
            total.carb += recipe.carb
            total.fat += recipe.fat

            return total
         },
         { calories: 0, protein: 0, carb: 0, fat: 0 }
      )
   })

   // GET USERDATA
   const { userData, userBMI } = useSelector(
      ({ storeForm: { userData, userBMI } }) => {
         // GUARD RETURN []
         if (userData.length === 0 && userBMI.length === 0)
            return { userData: [], userBMI: [] }

         const data = userData[0]

         // MALE CALCULATION
         if (data.gender === 'male') {
            let bmi = Math.round(
               (66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
                  data.activity *
                  data.yourGoal
            )
            return {
               userBMI,
               userData: {
                  name: data.name,
                  calories: bmi,
                  protein: Math.round((bmi * 22) / 100 / 4),
                  carb: Math.round((bmi * 55) / 100 / 4),
                  fat: Math.round((bmi * 23) / 100 / 9),
               },
            }
         }

         // FEMALE CALCULATION
         if (data.gender === 'female') {
            let bmi = Math.round(
               (655 +
                  9.6 * +data.weight +
                  1.8 * +data.height -
                  4.7 * +data.age) *
                  data.activity *
                  data.yourGoal
            )

            return {
               name: data.name,
               calories: bmi,
               protein: Math.round((bmi * 22) / 100 / 4),
               carb: Math.round((bmi * 55) / 100 / 4),
               fat: Math.round((bmi * 23) / 100 / 9),
            }
         }
      }
   )

   // HANDLES
   const handleOpenCaloriedModal = () => {
      dispatch(openUserData())
   }

   const handleDeleteUserData = () => {
      dispatch(deleteUserData())
   }

   const handleSaveData = () => {
      dispatch(getUserBMI(userData))
   }

   // JSX
   return (
      <Box
         height='320px'
         bgcolor='#fff'
         borderRadius='11px'
         display='flex'
         flexDirection='column'
         position='relative'
         // gap={5}
      >
         <Box>
            <Typography
               variant='subtitle2'
               color='#fff'
               bgcolor='primary.main'
               align='center'
               sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
            >
               USER
            </Typography>
         </Box>

         {/* DATAGRID BOX */}
         {userData.length !== 0 && (
            <Box
               height='550px'
               display='flex'
               flexDirection='column'
            >
               <Typography
                  textTransform='capitalize'
                  padding={1}
                  variant='h6'
                  color='rgba(0, 0, 0, 0.87)'
               >
                  Hello {userData?.name},
               </Typography>

               <TableContainer>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell >Calories</TableCell>
                           <TableCell>Protein</TableCell>
                           <TableCell>Carb</TableCell>
                           <TableCell>Fat</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell>
                              {userData?.calories - totalNutrition.calories}/
                              <Typography
                                 color='primary'
                                 variant='span'
                                 fontWeight={600}
                              >
                                 {userData?.calories}
                              </Typography>
                           </TableCell>
                           <TableCell>
                              {userData?.protein - totalNutrition.protein}/
                              <Typography
                                 color='primary'
                                 variant='span'
                                 fontWeight={600}
                              >
                                 {userData?.protein}
                              </Typography>
                           </TableCell>
                           <TableCell>
                              {userData?.carb - totalNutrition.carb}/
                              <Typography
                                 color='primary'
                                 variant='span'
                                 fontWeight={600}
                              >
                                 {userData?.carb}
                              </Typography>
                           </TableCell>
                           <TableCell>
                              {userData?.fat - totalNutrition.fat}/
                              <Typography
                                 color='primary'
                                 variant='span'
                                 fontWeight={600}
                              >
                                 {userData?.fat}
                              </Typography>
                           </TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
            </Box>
         )}
         {userData.length !== 0 && (
            <Button
               variant='contained'
               color='error'
               size='small'
               onClick={handleDeleteUserData}
               sx={{ alignSelf: 'center' }}
            >
               <Typography fontWeight='500'>Delete Data</Typography>
            </Button>
         )}

         {/* SETUP BUTTON */}
         {userData.length === 0 ? (
            <Button
               onClick={handleOpenCaloriedModal}
               variant='contained'
               sx={{
                  alignSelf: 'center',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
               }}
            >
               Set Up Data
            </Button>
         ) : (
            ''
         )}
      </Box>
   )
}
export default UserSection
