import { Box } from '@mui/material'
import HeaderSection from './sections/HeaderSection'
import IngredientSection from './sections/IngredientSection'
import FoodSection from './sections/FoodSection'
import RecipeSection from './sections/RecipeSection'

function App() {
   return (
      <Box>
         <HeaderSection />
         <IngredientSection />
         <FoodSection />
         <RecipeSection />
      </Box>
   )
}
export default App
