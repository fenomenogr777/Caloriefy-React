import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
   name: 'form',
   initialState: {
      query: '',
      userData: [],
   },
   reducers: {
     
   },
})

// export const { query } = formSlice.actions

export const formReducer = formSlice.reducer
