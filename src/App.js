import { Box, Container, Grid } from '@mui/material'
import HeaderSection from './sections/HeaderSection'
import IngredientSection from './sections/IngredientSection'
import FoodSection from './sections/FoodSection'
import RecipeSection from './sections/RecipeSection'
import UserSection from './sections/UserSection'
import FooterSection from './sections/FooterSection'
import DarkMode from './components/DarkMode'

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
         <Container
            maxWidth='lg'
            sx={{
               backgroundColor: 'primary.light',
               padding: '1rem',
               borderRadius: '11px',
               boxShadow: `0px 10px 20px #160f40`,
            }}
         >
            <Box
               display='flex'
               flexDirection='column'
               gap='50px'
               justifyContent='space-between'
            >
               <Box>
                  <DarkMode />
                  <Grid
                     spacing={2}
                     container
                  >
                     {/* HEADER SECTION (1) */}
                     <Grid
                        item
                        xs={12}
                     >
                        <HeaderSection />
                     </Grid>

                     {/* INGREDIENT SECTION (2) */}
                     <Grid
                        item
                        md={5}
                        xs={12}
                     >
                        <IngredientSection />
                     </Grid>

                     {/* FOOD SECTION (3) */}
                     <Grid
                        item
                        md={7}
                        xs={12}
                     >
                        <FoodSection />
                     </Grid>
                     <Grid
                        item
                        md={7}
                        xs={12}
                     >
                        {/* RECIPE SECTION (4) */}
                        <RecipeSection />
                     </Grid>
                     <Grid
                        item
                        md={5}
                        xs={12}
                     >
                        {/* USER SECTION (5) */}
                        <UserSection />
                     </Grid>
                  </Grid>
               </Box>
               {/* FOOTER SECTION (6) */}
               <FooterSection />
            </Box>
         </Container>
      </Box>
   )
}
export default App
