import { Box, Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { addIngredientData } from '../store'
import getIngredientData from '../api/foodApi'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

function SearchBar() {
   const [value, setValue] = useState('')
   const dispatch = useDispatch()

   const handleChange = e => {
      setValue(e.target.value)
   }

   // Takes query and get data from foodAPi,then store them on "store.storeFood.ingredientData"
   const handleSubmit = async e => {
      e.preventDefault()
      const data = await getIngredientData(value)
      dispatch(addIngredientData(data))
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
               Search
            </Button>
         </form>
      </Box>
   )
}
export default SearchBar
