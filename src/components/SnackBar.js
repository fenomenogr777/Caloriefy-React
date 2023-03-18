import { Alert, Box, Snackbar } from '@mui/material'
import ReactDOM from 'react-dom'

function SnackBar({ children, autoHideTime, open, onClose }) {
   // PORTAL AT '.snackbar-container'
   return ReactDOM.createPortal(
      <Box>
         <Snackbar
            message='recipe added'
            open={open}
            autoHideDuration={autoHideTime}
            onClose={onClose}
         >
            <Alert
               onClose={onClose}
               severity='success'
               sx={{ width: '100%' }}
               variant='filled'
            >
               {children}
            </Alert>
         </Snackbar>
      </Box>,
      document.querySelector('.snackbar-container')
   )
}
export default SnackBar
