import { Box } from '@mui/material'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import CalorieModal from '../components/CalorieModal'

function HeaderSection() {
   return (
      <Box>
         <Logo />
         <SearchBar />
         <CalorieModal />
      </Box>
   )
}
export default HeaderSection
