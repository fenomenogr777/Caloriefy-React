import { useContext, useState } from 'react';
import FoodContext from '../context/food';
import {
  Button,
  IconButton,
  TextField,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  Typography,
  Stack,
} from '@mui/material';
import RandomKEY from '../components/RandomKey';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { Box } from '@mui/system';

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
    <Stack
      direction="column"
      justifyContent="space-between"
      height={'21rem'}
      backgroundColor="#fff"
      borderRadius="11px"
    >
      <Box overflow="auto">
        <Box
          sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
          color="#fff"
          variant="body2"
          align="center"
          width="100%"
        >
          <Typography
            sx={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}
            bgcolor={'#4831d4'}
            color="#fff"
            variant="body2"
            width="100%"
            align="center"
          >
            Food Data
          </Typography>
        </Box>
        <Box padding="0rem 1rem">
          {/* TOTAL (1) */}

          <Box>
            {state.TotalNutrition ? (
              <Stack direction="row" gap={1} justifyContent="flex-start">
                <Typography variant="h6">TOTAL</Typography>
                <Typography variant="h6">
                  {state.TotalNutrition.calories}
                  <Typography variant="overline" component="span">
                    &nbsp; Calories
                  </Typography>
                </Typography>
                <Typography variant="h6">
                  {state.TotalNutrition.protein}
                  <Typography variant="overline" component="span">
                    &nbsp; Protein
                  </Typography>
                </Typography>
                <Typography variant="h6">
                  {state.TotalNutrition.carb}
                  <Typography variant="overline" component="span">
                    &nbsp; Carb
                  </Typography>
                </Typography>
                <Typography variant="h6">
                  {state.TotalNutrition.fat}
                  <Typography variant="overline" component="span">
                    &nbsp; Fat
                  </Typography>
                </Typography>
              </Stack>
            ) : (
              // <Typography>

              //   {state.TotalNutrition.protein}
              // </Typography>

              // <Typography>

              //   {state.TotalNutrition.carb}
              // </Typography>
              // <Typography>

              // {state.TotalNutrition.fat}
              // </Typography>
              ''
            )}
          </Box>

          <Divider />

          {/* RENDERED FOODS (2) */}
          <div>{renderedFoods()}</div>
        </Box>
      </Box>

      {/* FORM (3) */}

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

      {/*  */}
    </Stack>
  );
}
export default FoodSection;
