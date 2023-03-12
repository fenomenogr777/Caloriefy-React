import { Box, IconButton, Modal, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'

function CalorieModal() {
   const [open, setopen] = useState(false)

   const handleOpen = () => {
      setopen(true)
   }
   const handleClose = () => {
      setopen(false)
   }
   return (
      <Box>
         <IconButton
            onClick={handleOpen}
            color='primary'
            size='large'
         >
            <PersonAddIcon />
         </IconButton>
         <Modal
            open={open}
            onClose={handleClose}
         >
            <Box
               padding={3}
               borderRadius='11px'
               bgcolor='rgb(218, 214, 246)'
               width='500px'
               height='500px'
               position='absolute'
               left='50%'
               top='50%'
               sx={{ transform: 'translate(-50%, -70%)' }}
            >
               <IconButton onClick={handleClose} color='error'>
                  <ClearIcon />
               </IconButton>
               <Typography
                  id='modal-modal-title'
                  variant='h6'
                  component='h2'
               >
                  Calculate your Calories
               </Typography>
               <Typography
                  id='modal-modal-description'
                  sx={{ mt: 2 }}
               >
                  Form
               </Typography>
            </Box>
         </Modal>
      </Box>
   )
}
export default CalorieModal
