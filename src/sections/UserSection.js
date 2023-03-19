import { Box, Button, Typography } from '@mui/material'
import { display } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataGridComponent from '../components/DataGridComponent'
import useIsArray from '../hooks/useIsArray'
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
            // dispatch(getUserBMI('gfdgd'))

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

   // DATA FOR DATA GRID
   const columns = [
      { field: 'col1', headerName: 'Calories', width: 100 },
      { field: 'col2', headerName: 'Protein', width: 100 },
      { field: 'col3', headerName: 'Carb', width: 100 },
      { field: 'col4', headerName: 'Fat', width: 100 },
   ]

   const rows = [
      {
         id: 0,
         col1: `${userData?.calories - totalNutrition.calories}/${
            userData?.calories
         }`,
         col2: `${userData?.protein - totalNutrition.protein}/${
            userData?.protein
         }`,
         col3: `${userData?.carb - totalNutrition.carb}/${userData?.carb}`,
         col4: `${userData?.fat - totalNutrition.fat}/${userData?.fat}`,
      },
   ]

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
         {userData.length !== 0 ? (
            <Box
               height='550px'
               display='flex'
               flexDirection='column'
               justifyContent='space-between'
            >
               <Typography
                  textTransform='capitalize'
                  padding={1}
                  variant='h6'
                  color='rgba(0, 0, 0, 0.87)'
               >
                  Hello {userData?.name},
               </Typography>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  density='compact'
                  hideFooter
               />
               <Button
                  variant='contained'
                  color='error'
                  size='small'
                  onClick={handleDeleteUserData}
                  sx={{ alignSelf: 'center' }}
               >
                  <Typography fontWeight='500'>Delete Data</Typography>
               </Button>
            </Box>
         ) : (
            ''
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
