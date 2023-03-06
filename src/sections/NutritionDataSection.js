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
  Stack,
  Divider,
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
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height={'21rem'}
      backgroundColor="#fff"
      borderRadius="11px"
    >
      <Box width={'100%'}>
        <Typography
          sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
          bgcolor={'#4831d4'}
          color="#fff"
          variant="body2"
          align="center"
        >
          Nutrition Data
        </Typography>

        {state.currentFood && (
          <Box sx={{ padding: '0 1rem', lineHeight: '2' }}>
            <List>
              <ListItem disablePadding>
                <Typography variant="h6">
                  {`${state.currentFood.serving} gr of
                    ${state.currentFood.name}`}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body1">
                  {state.currentFood.calories}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body1">
                  {state.currentFood.protein}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body1">
                  {state.currentFood.carb}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body1">{state.currentFood.fat}</Typography>
              </ListItem>
              <Divider />
            </List>
          </Box>
        )}
      </Box>

      <Grid item >
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
