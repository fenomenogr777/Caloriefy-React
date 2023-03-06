import HeaderSection from './sections/HeaderSection';
import NutritionDataSection from './sections/NutritionDataSection';
import FoodSection from './sections/FoodSection';
import RecipeSection from './sections/RecipeSection';
import UserSection from './sections/UserSection';
import { Grid, Container, Box, createTheme } from '@mui/material';

function App() {
  const theme = createTheme({
    breakpoints: {
      values: {
        lg: 1200,
        md: 850,
        sm: 600,
        xl: 1500,
        xs: 0,
      },
    },
  });

  console.log(theme);

  return (
    <Container maxWidth="lg">
      <Box
        style={{
          background: '#dad6f6',
          marginTop: '50px',
          padding: '30px',
          borderRadius: '11px',
        }}
      >
        <Grid container spacing={2}>
          {/* HEADER SECTION (1) */}
          <Grid item xs={12} sm={12} md={12}>
            <HeaderSection />
          </Grid>

          {/* NUTRITION SECTION (2) */}
          <Grid item xs={12} sm={12} md={5}>
            <NutritionDataSection />
          </Grid>

          {/* FOOD SECTION (3) */}
          <Grid item xs={12} sm={12} md={7}>
            <FoodSection />
          </Grid>
          {/* RECIPE SECTION (4) */}
          <Grid item xs={12} sm={12} md={7}>
            <RecipeSection />
          </Grid>

          {/* USER SECTION (5) */}
          <Grid item xs={12} sm={12} md={5}>
            <UserSection />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default App;
