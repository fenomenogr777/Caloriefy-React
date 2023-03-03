import ReactDOM from 'react-dom';
import { Modal, Typography, Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useState } from 'react';
import FoodContext from '../context/food';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

function CaloriesModalSection({ isOpen, title, content, closeModal }) {
  const [values, setValues] = useState({
    gender: 'male',
    weight: '72',
    height: '182',
    age: '29',
    activity: '1.375',
    yourGoal: '1.15',
  });

  const { state, addUserData, addUserBMI } = useContext(FoodContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    addUserData(values);
    setValues({
      gender: '',
      weight: '',
      height: '',
      age: '',
      activity: '',
      yourGoal: '',
    });
    closeModal();
  };

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    closeModal();
  };

  return ReactDOM.createPortal(
    <div>
      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <Box
            sx={{
              height: 'auto',
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
              Calcutate daily calories
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* GENDER */}
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup name="gender" onChange={handleChange}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              {/* WEIGHT */}
              <TextField
                type={'number'}
                label="Weight (kg)"
                name="weight"
                value={values.weight}
                onChange={handleChange}
              />
              <TextField
                type={'number'}
                label="Height (cm)"
                name="height"
                value={values.height}
                onChange={handleChange}
              />
              <TextField
                type={'number'}
                label="Age"
                name="age"
                value={values.age}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                <Select
                  name="activity"
                  value={values.activity}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={1.2}>No Exercise</MenuItem>
                  <MenuItem value={1.375}>1-3 per week</MenuItem>
                  <MenuItem value={1.55}>4-5 per week</MenuItem>
                  <MenuItem value={1.725}>6-7 per week</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Your Goal</InputLabel>
                <Select
                  name="yourGoal"
                  value={values.yourGoal}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={0.85}>Lose Weight</MenuItem>
                  <MenuItem value={1}>Maintain Weight</MenuItem>
                  <MenuItem value={1.15}>GainWeight/Muscle Growth</MenuItem>
                </Select>
              </FormControl>

              <Button type="submit" variant="contained" color="primary">
                Calculate Calories
              </Button>
            </form>
            <Typography
              id="modal-modal-description"
              component="h6"
              variant="h6"
              sx={{ mt: 2 }}
            ></Typography>

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
export default CaloriesModalSection;
