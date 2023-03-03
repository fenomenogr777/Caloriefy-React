import { useContext, useState } from 'react';
import FoodContext from '../context/food';
import { Button, IconButton, TextField } from '@mui/material';
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

  const handleChange = e => {
    setValue(e.target.value);
  };

  const deleteFood = e => {
    const clicked = e.target.closest('.foodOnFoodSection').id;
    deleteFoodById(clicked);
    totalNutrition();
  };

  const renderedFoods = () => {
    const xxx = state.TotalFood.map(food => {
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

  const handleSubmit = e => {
    e.preventDefault();
    // GUARD NOT TO ADD WHEN TOTAL FOOD IS EMPTY
    // if (state.TotalFood.length === 0) return;
    addRecipeSection(value);
    clearTotalFood();
    console.log(state);
    setValue('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '300px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {state.TotalNutrition ? (
          <div>
            "C"{state.TotalNutrition.calories}"// P"{state.TotalNutrition.protein}"//"
            "C"{state.TotalNutrition.carb}"// F"{state.TotalNutrition.fat}"//" 
          </div>
        ) : (
          ''
        )}

        <div>{renderedFoods()}</div>
      </div>

      <div
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Recipe Name"
            value={value}
            onChange={handleChange}
            size="small"
            style={{ marginRight: '5px' }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            <AddCircleOutlineIcon />
            Add Recipe
          </Button>
        </form>
      </div>
    </div>
  );
}
export default FoodSection;
