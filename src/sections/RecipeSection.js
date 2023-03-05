import { useContext } from 'react';
import FoodContext from '../context/food';
import RandomKey from '../components/RandomKey';
import { Button, IconButton, Grid, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function RecipeSection() {
  const { state, deleteRecipeById, deleteAllRecipes } = useContext(FoodContext);

  if (state.Recipes.length > 0) {
    console.log(111111);
  }
  console.log(state);
  const deleteRecipe = (e) => {
    const clicked = e.target.closest('.recipeOnRecipeSection').id;
    deleteRecipeById(clicked);
  };

  const handledeleteAllRecipes = (e) => {
    deleteAllRecipes();
  };

  const renderedRecipes = () => {
    return state.Recipes.map((recipe) => {
      return (
        <div id={recipe.id} className="recipeOnRecipeSection" key={RandomKey()}>
          <div>{recipe.RecipeName}</div>
          {recipe.ingredient.map((ing) => {
            return <div key={RandomKey()}> {ing.name}</div>;
          })}
          {recipe.TotalNutrition.calories}
          {recipe.TotalNutrition.protein}
          {recipe.TotalNutrition.carb}
          {recipe.TotalNutrition.fat}
          <IconButton onClick={deleteRecipe} variant="contained" size="small">
            <CancelIcon color={'error'} />
          </IconButton>
        </div>
      );
    });
  };

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height={'21rem'}
      backgroundColor="#fff"
      padding="1rem"
      borderRadius="11px"
    >
      <Grid item>
        <Box>{renderedRecipes()}</Box>
      </Grid>

      <Grid item>
        <Button
          onClick={handledeleteAllRecipes}
          variant="contained"
          color="error"
          size="small"
        >
          Delete ALL
        </Button>
      </Grid>
    </Grid>
  );
}
export default RecipeSection;
