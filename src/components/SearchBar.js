import { Button, TextField, Grid } from '@mui/material';
import { useState, useContext } from 'react';
import FoodContext from '../context/food';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [value, setValue] = useState('milk');

  const { getFoodData } = useContext(FoodContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getFoodData(value);
    setValue('');
  };

  return (
    // SUBMIT
    <form onSubmit={handleSubmit}>
      <Grid container>
        {/* TEXTFIELD (1) */}
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <TextField
            label="Search Food"
            value={value}
            onChange={handleChange}
            size="small"
            background="#fff"
          />
        </Grid>

        {/* BUTTON (2) */}
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button startIcon={<SearchIcon />} type="submit" variant="contained">
            Search
          </Button>
        </Grid>
        {/*  */}
      </Grid>
    </form>
  );
}
export default SearchBar;
