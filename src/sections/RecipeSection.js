import { useContext } from 'react';
import FoodContext from '../context/food';
import RandomKey from '../components/RandomKey';
import { Button } from '@mui/material';

function RecipeSection() {
  const { state, deleteRecipeById, deleteAllRecipes } = useContext(FoodContext);

  if (state.Recipes.length > 0) {
    console.log(111111);
  }

  const deleteRecipe = e => {
    const clicked = e.target.closest('.recipeOnRecipeSection').id;
    deleteRecipeById(clicked);
  };

  const handledeleteAllRecipes = e => {
    deleteAllRecipes();
  };

  const renderedRecipes = () => {
    return state.Recipes.map(recipe => {
      return (
        <div id={recipe.id} className="recipeOnRecipeSection" key={RandomKey()}>
          <div>{recipe.RecipeName}</div>
          {recipe.ingredient.map(ing => {
            return <div key={RandomKey()}> {ing.name}</div>;
          })}
          {recipe.totalNutrition.calories}-{recipe.totalNutrition.protein}-
          {recipe.totalNutrition.carb}-{recipe.totalNutrition.fat}
          <Button
            onClick={deleteRecipe}
            variant="contained"
            color="error"
            size="small"
          >
            delete
          </Button>
        </div>
      );
    });
  };

  return (
    <div>
      {renderedRecipes()}
      <Button
        onClick={handledeleteAllRecipes}
        variant="contained"
        color="error"
        size="small"
      >
        Delete ALL
      </Button>
    </div>
  );
}
export default RecipeSection;
