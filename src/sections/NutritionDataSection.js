import { useContext, useEffect, useState } from 'react';
import FoodContext from '../context/food';
import {
  TextField,
  Button,
  Grid,
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';
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
  const handleClickAddFood = (e) => {
    e.preventDefault();
    // GUARD IF NO DATA AND CLICK BUTTON AGAIN
    if (value === '') return;
    addFoodSection();
    console.log(state);
    totalNutrition();
    setValue('');
  };

  const handleChange = (e) => {
    setValue(+e.target.value);
    updateOnChange(+e.target.value);
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
        {state.currentFood && (
          <Card height="320px">
            <CardHeader
              title={`${value || state.currentFood.serving} gr of ${
                state.currentFood.name
              }`}
            />
            <CardContent>
              <Typography>
                Calories:
                {state.currentUpdFood.calories ?? state.currentFood.calories}
              </Typography>
              <Typography>
                Proteins:
                {state.currentUpdFood.protein ?? state.currentFood.protein}
              </Typography>
              <Typography>
                Carbs:
                {state.currentUpdFood.carb ?? state.currentFood.carb}
              </Typography>
              <Typography>
                Fat:
                {state.currentUpdFood.fat ?? state.currentFood.fat}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>

      <Grid item>
        <form style={{}} onSubmit={handleClickAddFood}>
          <TextField
            type={'number'}
            label="Serving Size (gr)"
            value={value}
            onChange={handleChange}
            size="small"
            color="primary"
          />
          <Button type="submit" variant="contained" color="primary">
            <AddCircleOutlineIcon /> Add Food
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
export default NutritionDataSection;
