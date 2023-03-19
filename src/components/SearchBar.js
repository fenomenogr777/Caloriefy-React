import { Box, Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { getFood, getImage } from '../store'

function SearchBar() {
   const dispatch = useDispatch()
   const [value, setValue] = useState('')

   // HANDLES
   const handleChange = e => {
      setValue(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()
      // getFood is thunk getting user value and fetch data(data,error,isLoading)
      dispatch(getFood(value))
      dispatch(getImage(value))
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
