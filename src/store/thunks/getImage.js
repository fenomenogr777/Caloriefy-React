import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const getImage = createAsyncThunk('get/image', async query => {
   const res = await axios.get(`https://api.unsplash.com/search/photos`, {
      headers: {
         Authorization: 'Client-ID xbE_Gx0MpiswdS41DqhXcOrVHhMz5-8ZtrxV21lBIyc',
      },
      params: { query: query },
   })

   return res.data?.results[Math.trunc(Math.random() * 6 + 1)].urls.small
})

export { getImage }
