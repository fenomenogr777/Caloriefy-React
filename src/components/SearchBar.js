import { Button, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import SearchFoodApi from '../Api';

export default function SearchBar() {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    SearchFoodApi(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={1}>
        <TextField
          value={value}
          label="Search Food"
          onChange={handleChange}
          size="small"
        />
        <Button variant="contained" onClick={handleSubmit} size="medium">
          submit
        </Button>
      </Grid>
    </form>
  );
}
