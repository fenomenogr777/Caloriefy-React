import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from '@mui/material'
import { theme } from './styles/customTheme'

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

// MATERIAL UI CUSTOM THEME



root.render(
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </Provider>
)
