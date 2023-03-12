import { Box, Container, Grid } from '@mui/material'
import HeaderSection from './sections/HeaderSection'
import IngredientSection from './sections/IngredientSection'
import FoodSection from './sections/FoodSection'
import RecipeSection from './sections/RecipeSection'
import UserSection from './sections/UserSection'
import FooterSection from './sections/FooterSection'
function App() {
   return (
      <Box
         height='auto'
         pt={10}
         pb={10}
         sx={{
            backgroundImage: 'linear-gradient(to right bottom,#8776e7,#4831d4)',
         }}
      >
         <Container maxWidth='lg'>
            <Box
               display='flex'
               flexDirection='column'
               gap='50px'
               justifyContent='space-between'
            >
               <Box>
                  <Grid
                     bgcolor='rgb(218, 214, 246)'
                     borderRadius='11px'
                     boxShadow='0px 10px 20px black'
                     spacing={2}
                     container
                  >
                     <Grid
                        item
                        md={12}
                     >
                        <HeaderSection />
                     </Grid>
                     <Grid
                        item
                        md={5}
                     >
                        <IngredientSection />
                     </Grid>

                     <Grid
                        item
                        md={7}
                     >
                        <FoodSection />
                     </Grid>
                     <Grid
                        item
                        md={7}
                     >
                        <RecipeSection />
                     </Grid>
                     <Grid
                        item
                        md={5}
                     >
                        <UserSection />
                     </Grid>
                  </Grid>
               </Box>
               <FooterSection />
            </Box>
         </Container>
      </Box>
   )
}
export default App
