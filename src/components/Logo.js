import { Box } from '@mui/material'
import logo from '../images/logo.png'

function Logo() {
   return (
      <Box>
         <img
            src={logo}
            alt='website logo'
            width='150px'
         />
      </Box>
   )
}
export default Logo
