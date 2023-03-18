import {
   Box,
   Button,
   FormControl,
   FormControlLabel,
   FormLabel,
   IconButton,
   InputAdornment,
   InputLabel,
   MenuItem,
   Modal,
   Radio,
   RadioGroup,
   Select,
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openUserData, getUserData } from '../store'

function CalorieModal() {
   const dispatch = useDispatch()

   const userIsOpen = useSelector(({ storeForm: { userIsOpen } }) => {
      return userIsOpen
   })

   const [form, setForm] = useState({
      gender: 'male',
      name: 'nikos',
      weight: '70',
      height: '182',
      age: '29',
      activity: '1.375',
      yourGoal: '1.15',
   })

   const handleChange = e => {
      const { name, value } = e.target
      setForm({
         ...form,
         [name]: value,
      })
   }

   const handleOpen = () => {
      dispatch(openUserData())
   }
   const handleClose = () => {
      dispatch(openUserData())
   }

   const handleResetForm = () => {
      setForm({
         gender: '',
         name: '',
         weight: '',
         height: '',
         age: '',
         activity: '',
         yourGoal: '',
      })
   }

   const handleSubmitForm = e => {
      e.preventDefault()
      dispatch(getUserData([form]))
      dispatch(openUserData())
   }

   return (
      <Box>
         {/* CLICK TO OPEN MODAL */}
         <IconButton
            onClick={handleOpen}
            color='primary'
            size='large'
         >
            <PersonAddIcon />
         </IconButton>

         {/* MODAL */}
         <Modal
            open={userIsOpen}
            onClose={handleClose}
         >
            <Box
               padding={3}
               borderRadius='11px'
               bgcolor='rgb(218, 214, 246)'
               width='500px'
               height='auto'
               position='absolute'
               left='50%'
               top='50%'
               sx={{ transform: 'translate(-50%, -50%)' }}
            >
               {/* HEADER */}
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'row-reverse',
                     justifyContent: 'space-between',
                  }}
               >
                  <IconButton
                     onClick={handleClose}
                     color='error'
                  >
                     <ClearIcon />
                  </IconButton>

                  <Typography
                     id='modal-modal-title'
                     variant='h6'
                     component='h2'
                  >
                     Calculate your Calories
                  </Typography>
               </Box>

               <Typography
                  component='span'
                  id='modal-modal-description'
                  sx={{ mt: 2 }}
               >
                  <Box>
                     <form onSubmit={handleSubmitForm}>
                        <Stack
                           direction='column'
                           alignItems='flex-start'
                           gap={1}
                        >
                           {/* GENDER */}
                           <FormControl>
                              <FormLabel id='demo-radio-buttons-group-label'>
                                 Gender
                              </FormLabel>
                              <RadioGroup
                                 row
                                 defaultValue='female'
                                 name='gender'
                                 value={form.gender}
                                 onChange={handleChange}
                              >
                                 <FormControlLabel
                                    value='female'
                                    control={<Radio />}
                                    label='Female'
                                 />
                                 <FormControlLabel
                                    value='male'
                                    control={<Radio />}
                                    label='Male'
                                 />
                              </RadioGroup>
                           </FormControl>
                           {/* NAME */}
                           <TextField
                              autoCapitalize='form.name'
                              name='name'
                              value={form.name}
                              onChange={handleChange}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position='start'>
                                       name
                                    </InputAdornment>
                                 ),
                              }}
                           />
                           {/* WEIGHT */}
                           <TextField
                              name='weight'
                              value={form.weight}
                              type='number'
                              onChange={handleChange}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position='start'>
                                       kg
                                    </InputAdornment>
                                 ),
                              }}
                           />
                           {/* HEIGHT */}
                           <TextField
                              name='height'
                              value={form.height}
                              type='number'
                              onChange={handleChange}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position='start'>
                                       cm
                                    </InputAdornment>
                                 ),
                              }}
                           />
                           {/* AGE */}
                           <TextField
                              name='age'
                              value={form.age}
                              onChange={handleChange}
                              type='number'
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position='start'>
                                       years
                                    </InputAdornment>
                                 ),
                              }}
                           />
                           {/* ACTIVITY */}
                           <FormControl fullWidth>
                              <InputLabel>Activity</InputLabel>
                              <Select
                                 name='activity'
                                 value={form.activity}
                                 label='Age'
                                 onChange={handleChange}
                              >
                                 <MenuItem value={1.2}>No exercise</MenuItem>
                                 <MenuItem value={1.375}>
                                    1-3 times pre day
                                 </MenuItem>
                                 <MenuItem value={1.55}>
                                    3-5 times pre day
                                 </MenuItem>
                                 <MenuItem value={1.725}>
                                    6-7 times pre day
                                 </MenuItem>
                              </Select>
                           </FormControl>
                           {/* YOURGOAL */}
                           <FormControl fullWidth>
                              <InputLabel>Activity</InputLabel>
                              <Select
                                 name='yourGoal'
                                 value={form.yourGoal}
                                 label='Age'
                                 onChange={handleChange}
                              >
                                 <MenuItem value={0.85}>Lose Weight</MenuItem>
                                 <MenuItem value={1}>Maintain Weight</MenuItem>
                                 <MenuItem value={1.15}>
                                    Gain Weight/Muscle Growth
                                 </MenuItem>
                              </Select>
                           </FormControl>
                           <Box>
                              <Button
                                 type='submit'
                                 variant='contained'
                              >
                                 Calculate
                              </Button>
                              <Button
                                 variant='outlined'
                                 onClick={handleResetForm}
                              >
                                 Reset
                              </Button>
                           </Box>
                        </Stack>
                     </form>
                  </Box>
               </Typography>
            </Box>
         </Modal>
      </Box>
   )
}
export default CalorieModal
