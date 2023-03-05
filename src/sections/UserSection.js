import FoodContext from '../context/food';
import { useContext, useState } from 'react';
import { Button, Grid } from '@mui/material';

function UserSection() {
  const [open, setOpen] = useState(false);
  const { state, addUserBMI } = useContext(FoodContext);

  const calcBMI = () => {
    const data = state.UserData;

    if (data.gender === 'male') {
      return {
        calories:
          (66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
          data.activity *
          data.yourGoal,
        protein:
          ((66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
            data.activity *
            data.yourGoal *
            23) /
          100 /
          4,
        carb:
          ((66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
            data.activity *
            data.yourGoal *
            54) /
          100 /
          4,
        fat:
          ((66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
            data.activity *
            data.yourGoal *
            23) /
          100 /
          9,
      };
    }
  };

  const handleClick = () => {
    setOpen(true);
    console.log(calcBMI());
    addUserBMI(calcBMI());
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
      {!open && <div>set up calories to show</div>}

      <div>
        {state.UserData && !open && (
          <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Click to Show
            </Button>{' '}
          </div>
        )}

        {open && (
          <div>
            <div>Remaining</div>
            {/* calories */}
            <div>Calories</div>
            <div>
              {state.UserBMI &&
                state.Recipes.reduce((acc, food) => {
                  return acc - food.TotalNutrition.calories;
                }, +state.UserBMI.calories)}
              /{state.UserBMI.calories}
            </div>
            {/* Protein */}
            <div>Protein</div>
            <div>
              {state.UserBMI &&
                state.Recipes.reduce((acc, food) => {
                  return acc - food.TotalNutrition.protein;
                }, +state.UserBMI.protein)}
              /{state.UserBMI.protein}
            </div>
            {/* carb */}
            <div>Carb</div>
            <div>
              {state.UserBMI &&
                state.Recipes.reduce((acc, food) => {
                  return acc - food.TotalNutrition.carb;
                }, +state.UserBMI.carb)}
              /{state.UserBMI.carb}
            </div>
            {/* fat */}
            <div>Fat</div>
            <div>
              {state.UserBMI &&
                state.Recipes.reduce((acc, food) => {
                  return acc - food.TotalNutrition.fat;
                }, +state.UserBMI.fat)}
              /{state.UserBMI.fat}
            </div>
            <Button size="small" variant="contained" color="error">
              Delete all
            </Button>
          </div>
        )}
      </div>
    </Grid>
  );
}
export default UserSection;
