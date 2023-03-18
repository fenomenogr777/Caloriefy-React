import {
   Box,
   Button,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@mui/material'
import { useState } from 'react'

function Dialog() {
   const [open, setOpen] = useState(false)

   const handleClose = () => {
      setOpen(false)
   }

   return (
      <>
         <Button onClick={() => setOpen(true)}>open me</Button>

         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'
         >
            <DialogTitle id='dialog-title'>title</DialogTitle>
            <DialogContent>
               <DialogContentText id='dialog-description'>
                  gfdgfdgfgfd
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>close</Button>
            </DialogActions>
         </Dialog>
      </>
   )
}
export default Dialog
