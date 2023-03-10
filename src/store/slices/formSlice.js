import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
   name: 'form',
   initialState: {
      query: '',
      userData: [],
   },
   reducers: {
      changeQuery(state, action) {
         state.query = action.payload
      },
   },
})

export const { changeQuery } = formSlice.actions

export const formReducer = formSlice.reducer
