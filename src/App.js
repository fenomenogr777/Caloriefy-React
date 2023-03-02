import HeaderSection from './sections/HeaderSection';
import NutritionDataSection from './sections/NutritionDataSection';
import FoodSection from './sections/FoodSection';
import RecipeSection from './sections/RecipeSection';
import UserSection from './sections/UserSection';
import { Grid, Container, Box } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <div
        style={{
          background: '#dad6f6',
          marginTop: '50px',
          padding: '30px',
          borderRadius: '11px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HeaderSection />
          </Grid>
          {/* NUTRITION SECTION */}
          <Grid item xs={5}>
            <Box
              sx={{
                width: 'auto',
                height: 300,
                padding: '1rem',
                borderRadius: '11px',
                backgroundColor: '#fff',
              }}
            >
              <NutritionDataSection />
            </Box>
          </Grid>
          {/* FOOD SECTION */}
          <Grid item xs={7}>
            <Box
              sx={{
                width: 'auto',
                height: 300,
                padding: '1rem',
                borderRadius: '11px',
                backgroundColor: '#fff',
              }}
            >
              <FoodSection />
            </Box>
          </Grid>
          {/* RECIPE SECTION */}
          <Grid item xs={7}>
            <Box
              sx={{
                width: 'auto',
                height: 300,
                padding: '1rem',
                borderRadius: '11px',
                backgroundColor: '#fff',
              }}
            >
              <RecipeSection />
            </Box>
          </Grid>

          {/* USER SECTION */}
          <Grid item xs={5}>
            <Box
              sx={{
                width: 'auto',
                height: 300,
                padding: '1rem',
                borderRadius: '11px',
                backgroundColor: '#fff',
              }}
            >
              <UserSection />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
export default App;
