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
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openUserData, deleteUserBMI, getUserBMI, getUserData } from '../store'
import UserdataBMI from '../components/UserdataBMI'

function UserSection() {
   const dispatch = useDispatch()
   const store = useSelector(state => state)

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

   const data1 = useSelector(({ storeForm: { userBMI } }) => userBMI)
   const userBMI = Object.assign({}, data1)
   console.log(userBMI)

   useEffect(() => {
      if (Object.keys(userBMI).length === 0) return
      // guard if onbject is empty dont re assign value
      const data = userBMI || []
      console.log(1111111111111)
      window.localStorage.setItem('USER_DATA_STORE', JSON.stringify(data))
   }, [userBMI])

   useEffect(() => {
      const data = JSON.parse(window.localStorage.getItem('USER_DATA_STORE'))
      dispatch(getUserBMI(data))
   }, [dispatch])

   // HANDLES
   const handleOpenCaloriedModal = () => {
      dispatch(openUserData())
   }

   const handleDeleteUserBMI = () => {
      dispatch(deleteUserBMI())
   }

   console.log(store)

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

         <Box
            height='550px'
            display='flex'
            flexDirection='column'
         >
            {userBMI.calories && (
               <Box>
                  <Typography
                     textTransform='capitalize'
                     padding={1}
                     variant='h6'
                     color='rgba(0, 0, 0, 0.87)'
                  >
                     Hello {userBMI?.name},
                  </Typography>
                  <TableContainer>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell>Calories</TableCell>
                              <TableCell>Protein</TableCell>
                              <TableCell>Carb</TableCell>
                              <TableCell>Fat</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell>
                                 {userBMI?.calories - totalNutrition.calories}/
                                 <Typography
                                    color='primary'
                                    variant='span'
                                    fontWeight={600}
                                 >
                                    {userBMI?.calories}
                                 </Typography>
                              </TableCell>
                              <TableCell>
                                 {userBMI?.protein - totalNutrition.protein}/
                                 <Typography
                                    color='primary'
                                    variant='span'
                                    fontWeight={600}
                                 >
                                    {userBMI?.protein}
                                 </Typography>
                              </TableCell>
                              <TableCell>
                                 {userBMI?.carb - totalNutrition.carb}/
                                 <Typography
                                    color='primary'
                                    variant='span'
                                    fontWeight={600}
                                 >
                                    {userBMI?.carb}
                                 </Typography>
                              </TableCell>
                              <TableCell>
                                 {userBMI?.fat - totalNutrition.fat}/
                                 <Typography
                                    color='primary'
                                    variant='span'
                                    fontWeight={600}
                                 >
                                    {userBMI?.fat}
                                 </Typography>
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            )}
         </Box>

         {userBMI?.length !== 0 && (
            <Button
               variant='contained'
               color='primary'
               size='small'
               onClick={handleOpenCaloriedModal}
               sx={{ alignSelf: 'center' }}
            >
               <Typography fontWeight='500'>ReCalculate Data</Typography>
            </Button>
         )}

         {/* SETUP BUTTON */}
         {userBMI?.length === 0 ? (
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
