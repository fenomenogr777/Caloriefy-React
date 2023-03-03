import Logo from '../components/Logo';
import logoImage from '../images/logo.png';
import SearchBar from '../components/SearchBar';
import ModalComponent from '../components/ModalComponent';
import { Grid } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import ExerciseModalSection from './ExerciseModalSection';
import CaloriesModalSection from './CaloriesModalSection';

function HeaderSection() {
  const [openExercise, setOpenExercise] = useState(false);
  const [openCalorie, setOpenCalorie] = useState(false);

  const divEl1 = useRef();
  const divEl2 = useRef();

  const openModal = e => {
    if (divEl1.current.contains(e.target)) {
      setOpenExercise(!openExercise);
    }
    if (divEl2.current.contains(e.target)) {
      setOpenCalorie(!openCalorie);
    }
  };

  const closeModal = () => {
    setOpenExercise(false);
    setOpenCalorie(false);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Logo src={logoImage} alt="website logo" />
      </Grid>
      <Grid item>
        <SearchBar />
      </Grid>

      <Grid item style={{ display: 'flex', gap: '1rem' }}>
        <IconButton ref={divEl1} onClick={openModal}>
          <FitnessCenterIcon />
          <ExerciseModalSection isOpen={openExercise} closeModal={closeModal} />
        </IconButton>
      </Grid>
      <Grid item style={{ display: 'flex', gap: '1rem' }}>
        <IconButton ref={divEl2} onClick={openModal}>
          <MenuBookIcon />
          <CaloriesModalSection isOpen={openCalorie} closeModal={closeModal} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
export default HeaderSection;
