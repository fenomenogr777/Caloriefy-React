import { Box, Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, changeQuery } from '../store'
import getIngredientData from '../api/foodApi'

function SearchBar() {
   const dispatch = useDispatch()
   const { query } = useSelector(({ storeForm }) => storeForm)

   const handleChange = e => {
      dispatch(changeQuery(e.target.value))
   }

   // Takes query and get data from foodAPi,then store them on "store.storeFood.ingredientData"
   const handleSubmit = async e => {
      e.preventDefault()
      const data = await getIngredientData(query)
      dispatch(addIngredient(data))
      dispatch(changeQuery(''))
   }

   return (
      <Box>
         <form onSubmit={handleSubmit}>
            <TextField
               value={query}
               onChange={handleChange}
            />
            <Button type='submit'>Add</Button>
         </form>
      </Box>
   )
}
export default SearchBar
