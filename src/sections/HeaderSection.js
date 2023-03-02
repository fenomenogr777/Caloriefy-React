import Logo from '../components/Logo';
import logoImage from '../images/logo.png';
import SearchBar from '../components/SearchBar';
import ModalComponent from '../components/ModalComponent';
import { Grid } from '@mui/material';

function HeaderSection() {
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
        <ModalComponent />
        <ModalComponent />
      </Grid>
    </Grid>
  );
}
export default HeaderSection;
