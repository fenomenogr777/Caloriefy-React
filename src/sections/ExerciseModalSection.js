import ReactDOM from 'react-dom';
import { Modal, Typography, Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import exerciseApi from '../api/exerciseApi';
import { useState } from 'react';

function ExerciseModalSection({ isOpen, title, content, closeModal }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    closeModal();
  };

  return ReactDOM.createPortal(
    <div>
      {true && (
        <Modal open={isOpen} onClose={handleClose}>
          <Box
            sx={{
              height: '50%',
              width: '40%',
              position: 'absolute',
              background: 'white',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              padding: '0.5rem',
              borderRadius: '9px',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h3">
              Calculate Exercise calories burn
              <div></div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {content}Υπο κατασκευη καποτεεεε
            </Typography>
            <IconButton color="error" variant="contained" onClick={handleClose}>
              <CancelIcon sx={{ position: 'absolute', top: '0' }} />
            </IconButton>
          </Box>
        </Modal>
      )}
    </div>,
    document.querySelector('.modal-container')
  );
}
export default ExerciseModalSection;
