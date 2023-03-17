import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { createTheme, ThemeProvider } from '@mui/material'

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

// MATERIAL UI CUSTOM THEME
const theme = createTheme({
   palette: {
      primary: {
         main: 'rgb(72, 49, 212);',
      },
   },
})


root.render(
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </Provider>
)
