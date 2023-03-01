import { Button, TextField, Grid } from '@mui/material';
import { useState, useContext } from 'react';
import FoodContext from '../context/food';

function SearchBar() {
  const [value, setValue] = useState('');

  const { getFoodData } = useContext(FoodContext);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    getFoodData(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" gap={0.5}>
        <Grid item>
          <TextField
            label="Search Food"
            value={value}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default SearchBar;
