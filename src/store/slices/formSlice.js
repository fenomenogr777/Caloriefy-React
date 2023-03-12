import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
   name: 'form',
   initialState: {
      query: '',
      userData: [],
      userIsOpen: false,
   },
   reducers: {
      getUserData(state, action) {
         state.userData = action.payload
      },
      openUserData(state, action) {
         state.userIsOpen = !state.userIsOpen
      },
      deleteUserData(state, action) {
         state.userData = []
      },
   },
})

export const { getUserData, openUserData, deleteUserData } = formSlice.actions

export const formReducer = formSlice.reducer
