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
      secondary: {
         main: '#ccf381',
         dark: '#40c057',
      },
      primary: {
         main: '#4831d4',
         light: '#dad6f6',
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
