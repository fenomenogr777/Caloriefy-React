import { Box, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { getFood } from '../store'

function SearchBar() {
   const [value, setValue] = useState('')

   const dispatch = useDispatch()

   const handleChange = e => {
      setValue(e.target.value)
   }

   // FETCH DATA USING REDUX THUNK ON getFood
   const handleSubmit = e => {
      e.preventDefault()
      console.log(
      dispatch(getFood(value)) )
      setValue('')
   }

   return (
      <Box>
         <form
            onSubmit={handleSubmit}
            style={{ display: 'flex' }}
         >
            <TextField
               label='Search Ingredient'
               size='small'
               value={value}
               onChange={handleChange}
            />
            <Button
               startIcon={<SearchIcon />}
               variant='contained'
               type='submit'
            >
               search
            </Button>
         </form>
      </Box>
   )
}
export default SearchBar
