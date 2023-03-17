import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
   name: 'form',
   initialState: {
      userData: [],
      userBMI: [],
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
      getUserBMI(state, action) {
         state.userBMI = action.payload
      },
   },
})

export const { getUserData, openUserData, deleteUserData, getUserBMI } =
   formSlice.actions

export const formReducer = formSlice.reducer
