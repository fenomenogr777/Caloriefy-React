import { Button, TextField, Grid } from '@mui/material'
import { useState, useContext } from 'react'
import FoodContext from '../context/food'
import SearchIcon from '@mui/icons-material/Search'
import { Stack } from '@mui/system'

function SearchBar() {
   const [value, setValue] = useState('milk')

   const { getFoodData } = useContext(FoodContext)

   const handleChange = e => {
      setValue(e.target.value)
   }

   const handleSubmit = async e => {
      e.preventDefault()
      getFoodData(value)
      setValue('')
   }

   return (
      // SUBMIT
      <form onSubmit={handleSubmit}>
         <Grid container justifyContent="center">
            <Stack
               direction='row'
               alignItems='center'
               justifyContent='center'>
               {/* TEXTFIELD (1) */}
               <TextField
                  label='Search Food'
                  value={value}
                  onChange={handleChange}
                  size='small'
                  background='#fff'
               />

               {/* BUTTON (2) */}
               <Button
                  startIcon={<SearchIcon />}
                  type='submit'
                  variant='contained'>
                  Search
               </Button>
               {/*  */}
            </Stack>
         </Grid>
      </form>
   )
}
export default SearchBar
