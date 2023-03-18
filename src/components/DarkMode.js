import { Box, Switch, Typography } from '@mui/material'
import ReactDOM from 'react-dom'

function DarkMode() {
   const label = { inputProps: { 'aria-label': 'Switch demo' } }

   return ReactDOM.createPortal(
      <Box
         position='absolute'
         right={0}
         top={0}
         display='flex'
         alignItems='center'
         color='white'
      >
         <Typography color="secondary.main" fontWeight={700}>Dark Mode(on development)</Typography>
         <Switch
            color='secondary'
            {...label}
         />
      </Box>,
      document.querySelector('.dark-mode')
   )
}
export default DarkMode
