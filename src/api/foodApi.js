import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'

const getIngredientData = async query => {
   try {
      const options = {
         headers: { 'X-Api-Key': 'Qwl5+75I9DXtOQFKazelyQ==UcQ3BFwo90tS46lP' },
      }

      const res = await axios.get(
         `https://api.api-ninjas.com/v1/nutrition?query=${query}
  `,
         options
      )

      const data = {
         name: res.data[0].name,
         calories: res.data[0].calories,
         protein: res.data[0].protein_g,
         carb: res.data[0].carbohydrates_total_g,
         fat: res.data[0].fat_total_g,
         serving: res.data[0].serving_size_g,
         id: nanoid(),
      }
      return data
   } catch (error) {
      console.error(error)
   }
}

export default getIngredientData
