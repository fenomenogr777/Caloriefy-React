import { useDispatch, useSelector } from 'react-redux'
import { getUserBMI } from '../store'

function UserdataBMI(val) {
   const data = val
   console.log(data)

   let userData

   // MALE CALCULATION
   if (data?.gender === 'male') {
      let bmi = Math.round(
         (66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
            data.activity *
            data.yourGoal
      )

      userData = {
         name: data.name,
         calories: bmi,
         protein: Math.round((bmi * 22) / 100 / 4),
         carb: Math.round((bmi * 55) / 100 / 4),
         fat: Math.round((bmi * 23) / 100 / 9),
      }
   }

   // FEMALE CALCULATION
   if (data?.gender === 'female') {
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

   console.log(userData)
   return userData
}
export default UserdataBMI
