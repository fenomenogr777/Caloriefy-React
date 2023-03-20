import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IMAGES_API_KEY } from '../../config'
import { IMAGES_API_URL } from '../../config'

const getImage = createAsyncThunk('get/image', async query => {
   const res = await axios.get(IMAGES_API_URL, {
      headers: {
         Authorization: IMAGES_API_KEY,
      },
      params: { query: query },
   })

   return res.data?.results[Math.trunc(Math.random() * 6 + 1)].urls.small
})

export { getImage }
