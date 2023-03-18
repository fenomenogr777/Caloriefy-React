import { Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import { openUserData, deleteUserData, getUserBMI, getUserData } from '../store'

function UserSection() {
   const [data, setData] = useState('')
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

   console.log(userBMI)

   const handleOpen = () => {
      dispatch(openUserData())
   }

   const handleDeleteUserData = () => {
      dispatch(deleteUserData())
   }
   console.log(totalNutrition)

   const [open, setOpen] = useState(false)

   const handleClose = () => {
      setOpen(true)
      setTimeout(() => {
         setOpen(false)
      }, 2000)
   }

   const handleSaveData = () => {
      dispatch(getUserBMI(userData))
   }

   useEffect(() => {
      const data = JSON.parse(window.localStorage.getItem('USER_DATA_STORE'))
      console.log(data)
      dispatch(getUserBMI(data))
   }, [])
   console.log(data)

   useEffect(() => {
      // if (!userBMI?.name) return
      window.localStorage.setItem('USER_DATA_STORE', JSON.stringify(userBMI))
   }, [userBMI])

   return (
      <Box
         height='320px'
         bgcolor='#fff'
         borderRadius='11px'
         display='flex'
         flexDirection='column'
         gap={5}
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

         <Box alignSelf='center'>
            {true ? (
               <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='space-between'
               >
                  <Box>
                     <Typography
                        variant='h6'
                        textTransform='capitalize'
                     >
                        Hello {userBMI?.name} ,
                     </Typography>
                     <Typography>
                        {Math.round(
                           data.calories ??
                              userBMI?.calories - totalNutrition.calories
                        )}
                        /{userBMI?.calories} Calories
                     </Typography>
                     <Typography>
                        {Math.round(userBMI?.protein - totalNutrition.protein)}/
                        {userBMI?.protein} Protein
                     </Typography>
                     <Typography>
                        {Math.round(userBMI?.carb - totalNutrition.carb)}/
                        {userBMI?.carb} Carb
                     </Typography>
                     <Typography>
                        {Math.round(userBMI?.fat - totalNutrition.fat)}/
                        {userBMI?.fat} Fat
                     </Typography>
                  </Box>
                  {/* IF USERBMI EMTY = SAVE ELSE DELETE BUTTON */}
                  {userBMI?.name ? (
                     <Button
                        variant='contained'
                        onClick={handleSaveData}
                     >
                        Save Data
                     </Button>
                  ) : (
                     <Button
                        onClick={handleDeleteUserData}
                        variant='contained'
                        color='error'
                        size='small'
                     >
                        Delete Data
                     </Button>
                  )}
                  {/* SETUP CALORIES */}
               </Box>
            ) : (
               // <Button
               //    onClick={handleOpen}
               //    variant='contained'
               // >
               //    Set up Your calories data
               // </Button>
               ''
            )}
         </Box>
      </Box>
   )
}
export default UserSection
