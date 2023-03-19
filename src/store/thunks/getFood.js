import { createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const getFood = createAsyncThunk('get/food', async query => {
   const options = {
      headers: { 'X-Api-Key': 'Qwl5+75I9DXtOQFKazelyQ==UcQ3BFwo90tS46lP' },
   }
   
   const res = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${query}
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
