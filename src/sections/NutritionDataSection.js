import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import FoodContext from '../context/food';
import TextField from '@mui/material/TextField';

function NutritionDataSection() {
  const [value, setValue] = useState(null);

  const { state, updateOnChange, addFoodSection } = useContext(FoodContext);

  const handleClickAddFood = () => {
    // GUARD IF NO DATA AND CLICK BUTTON AGAIN
    if (value === '') return;
    addFoodSection();
    console.log(state);
    setValue('');
  };

  const handleChange = e => {
    setValue(+e.target.value);
    updateOnChange(+e.target.value);
  };

  return (
    <div>
      {state.currentFood && (
        <div>
          <div>{state.currentFood.name}</div>
          <div>{value ?? state.currentFood.serving}</div>
          <div>
            {state.currentUpdFood.calories ?? state.currentFood.calories}
          </div>
          <div>{state.currentUpdFood.protein ?? state.currentFood.protein}</div>
          <div>{state.currentUpdFood.carb ?? state.currentFood.carb}</div>
          <div>{state.currentUpdFood.fat ?? state.currentFood.fat}</div>
        </div>
      )}
      <TextField
        style={{ margin: '5px' }}
        type={'number'}
        id=""
        label="Serving Size (gr)"
        value={value ?? +state.currentFood.serving}
        onChange={handleChange}
      />
      <Button variant="contained" color="error" onClick={handleClickAddFood}>
        Add Food
      </Button>
    </div>
  );
}
export default NutritionDataSection;
