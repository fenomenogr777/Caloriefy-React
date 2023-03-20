import { createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { FOOD_API_KEY } from '../../config'
import { FOOD_API_URL } from '../../config'

const getFood = createAsyncThunk('get/food', async query => {
   const options = {
      headers: { 'X-Api-Key': FOOD_API_KEY },
   }

   const res = await axios.get(
      `${FOOD_API_URL}${query}
      `,
      options
   )

   // IF THERE ARE NO  DATA RETURN ERROR
   if (res.data.length === 0) throw new Error('Food doesnt exist!!!')

   const data = {
      name: res.data[0].name,
      calories: res.data[0].calories / 100,
      protein: res.data[0].protein_g / 100,
      carb: res.data[0].carbohydrates_total_g / 100,
      fat: res.data[0].fat_total_g / 100,
      serving: res.data[0].serving_size_g,
      id: nanoid(),
   }

   return data
})

export { getFood }
