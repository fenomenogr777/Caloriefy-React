import { useContext, useState } from 'react';
import FoodContext from '../context/food';
import { Button, IconButton, TextField, Grid,Paper } from '@mui/material';
import RandomKEY from '../components/RandomKey';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function FoodSection() {
  const [value, setValue] = useState('');
  const {
    state,
    addRecipeSection,
    clearTotalFood,
    deleteFoodById,
    totalNutrition,
  } = useContext(FoodContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const deleteFood = (e) => {
    const clicked = e.target.closest('.foodOnFoodSection').id;
    deleteFoodById(clicked);
    totalNutrition();
  };

  const renderedFoods = () => {
    const xxx = state.TotalFood.map((food) => {
      return (
        <div
          className="foodOnFoodSection"
          id={food.id}
          key={RandomKEY()}
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <span>
            {food.serving} gr of {food.name}
          </span>
          (<span>{food.calories}</span>
          <span>{food.protein}</span>
          <span>{food.carb}</span>
          <span>{food.fat}</span>)
          <IconButton
            onClick={deleteFood}
            variant="contained"
            color="error"
            size="small"
          >
            <CancelIcon color={'error'} />
          </IconButton>
        </div>
      );
    });
    return xxx;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // GUARD NOT TO ADD WHEN TOTAL FOOD IS EMPTY
    // if (state.TotalFood.length === 0) return;
    addRecipeSection(value);
    clearTotalFood();
    console.log(state);
    setValue('');
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
        {/* TOTAL (1) */}
        <div>
          {state.TotalNutrition ? (
            <Paper>
              "C"{state.TotalNutrition.calories}"// P"
              {state.TotalNutrition.protein}"//" "C"{state.TotalNutrition.carb}
              "// F"{state.TotalNutrition.fat}"//"
            </Paper>
          ) : (
            ''
          )}
        </div>

        {/* RENDERED FOODS (2) */}
        <div>{renderedFoods()}</div>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          {/* TEXTFIELD(A) */}
          <TextField
            label="Recipe Name"
            value={value}
            onChange={handleChange}
            size="small"
            style={{ marginRight: '5px' }}
            required
          />
          {/* BUTTON (B) */}
          <Button type="submit" variant="contained" color="primary">
            <AddCircleOutlineIcon />
            Add Recipe
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
export default FoodSection;
