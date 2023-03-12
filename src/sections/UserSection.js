import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useIsArray from '../hooks/useIsArray'
import { openUserData, deleteUserData } from '../store'

function UserSection() {
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

   const userData = useSelector(({ storeForm: { userData } }) => {
      // GUARD
      if (userData.length === 0) return []

      const data = userData[0]

      // MALE
      if (data.gender === 'male') {
         let bmi = Math.round(
            (66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
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
      // FEMALE
      if (data.gender === 'female') {
         let bmi = Math.round(
            (655 + 9.6 * +data.weight + 1.8 * +data.height - 4.7 * +data.age) *
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
   })

   const dispatch = useDispatch()

   const handleOpen = () => {
      dispatch(openUserData())
   }

   const handleDeleteUserData = () => {
      dispatch(deleteUserData())
   }
   console.log(userData, totalNutrition)

   return (
      <Box
         padding='1rem'
         height='300px'
         bgcolor='#fff'
         borderRadius='11px'
      >
         <Box>
            {useIsArray(
               userData,
               <Box>
                  <Typography
                     variant='h6'
                     textTransform='capitalize'
                  >
                     Hello {userData?.name} ,
                  </Typography>
                  <Typography>
                     {Math.round(userData?.calories - totalNutrition.calories)}/
                     {userData?.calories} Calories
                  </Typography>
                  <Typography>
                     {Math.round(userData?.protein - totalNutrition.protein)}/
                     {userData?.protein} Protein
                  </Typography>
                  <Typography>
                     {Math.round(userData?.carb - totalNutrition.carb)}/
                     {userData?.carb} Carb
                  </Typography>
                  <Typography>
                     {Math.round(userData?.fat - totalNutrition.fat)}/
                     {userData?.fat} Fat
                  </Typography>
                  <Button
                     onClick={handleDeleteUserData}
                     variant='contained'
                     color='error'
                  >
                     Delete Data
                  </Button>
               </Box>,
               <Button
                  onClick={handleOpen}
                  variant='contained'
               >
                  Set up Your calories data
               </Button>
            )}
         </Box>
      </Box>
   )
}
export default UserSection
