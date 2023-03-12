import { Box, Stack } from '@mui/material'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import CalorieModal from '../components/CalorieModal'

function HeaderSection() {
   return (
      <Box>
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Logo />
            <SearchBar />
            <CalorieModal />
         </Stack>
      </Box>
   )
}
export default HeaderSection
