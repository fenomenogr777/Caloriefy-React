import { useContext, useEffect, useState } from 'react';
import FoodContext from '../context/food';
import { TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function NutritionDataSection() {
  const [value, setValue] = useState('');
  const { state, updateOnChange, addFoodSection, totalNutrition } =
    useContext(FoodContext);

  // SET GRAMS TO 100 WHEN CURRENTFOOD CHANGE
  useEffect(() => {
    if (state.currentFood?.serving) {
      setValue(+state.currentFood?.serving);
    }
  }, [state.currentFood]);

  // WHEN USER CLICKS BUTTON "ADD FOOD"
  const handleClickAddFood = e => {
    e.preventDefault();
    // GUARD IF NO DATA AND CLICK BUTTON AGAIN
    if (value === '') return;
    addFoodSection();
    console.log(state);
    totalNutrition();
    setValue('');
  };

  const handleChange = e => {
    setValue(+e.target.value);
    updateOnChange(+e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '300px',
      }}
    >
      <div>
        {state.currentFood && (
          <div>
            <div>{state.currentFood.name}</div>
            <div>{value || state.currentFood.serving}</div>
            <div>
              {state.currentUpdFood.calories ?? state.currentFood.calories}
            </div>
            <div>
              {state.currentUpdFood.protein ?? state.currentFood.protein}
            </div>
            <div>{state.currentUpdFood.carb ?? state.currentFood.carb}</div>
            <div>{state.currentUpdFood.fat ?? state.currentFood.fat}</div>
          </div>
        )}
      </div>
      <form
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={handleClickAddFood}
      >
        <TextField
          style={{ margin: '5px' }}
          type={'number'}
          label="Serving Size (gr)"
          value={value}
          onChange={handleChange}
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">
          <AddCircleOutlineIcon /> Add Food
        </Button>
      </form>
    </div>
  );
}
export default NutritionDataSection;
