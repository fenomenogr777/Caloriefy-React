import { createTheme } from '@mui/material'

const theme = createTheme({
   breakpoints: {
      values: { lg: 1200, md: 1070, sm: 600, xl: 1536, xs: 0 },
   },
   palette: {
      secondary: {
         main: '#ccf381',
         dark: '#40c057',
      },
      primary: {
         main: '#4831d4',
         light: '#dad6f6',
         dark: '#160f40',
      },
   },
})

export { theme }
