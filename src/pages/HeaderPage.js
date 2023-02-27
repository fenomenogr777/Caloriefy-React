import { Grid } from '@mui/material';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

function HeaderPage() {
  return (
    <div>
      <Grid container alignItems="center" gap={5} justifyContent="space-around">
        <Logo />
        <SearchBar />
        <Modal />
        <Modal />
      </Grid>
    </div>
  );
}

export default HeaderPage;
