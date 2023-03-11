import { Box, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addIngredientData } from '../store'
import getIngredientData from '../api/foodApi'
import { useState } from 'react'

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
         <form onSubmit={handleSubmit}>
            <TextField
               value={value}
               onChange={handleChange}
            />
            <Button type='submit'>Add</Button>
         </form>
      </Box>
   )
}
export default SearchBar
