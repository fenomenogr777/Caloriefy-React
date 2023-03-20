import { Box, Typography } from '@mui/material'
import CurrentYear from '../components/CurrentYear'

function FooterSection() {
   return (
      <Box>
         <Typography
            align='center'
            color='gray'
         >
            Copyright© {CurrentYear()} by Nikos Chionis , Inc. All rights
            reserved.
         </Typography>
      </Box>
   )
}
export default FooterSection
