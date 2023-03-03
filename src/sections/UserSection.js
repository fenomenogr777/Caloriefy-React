import FoodContext from '../context/food';
import { useContext } from 'react';
import Button from '@mui/material/Button'

function UserSection() {
  const { state, addUserBMI } = useContext(FoodContext);

  const handleClick=()=>{
    addUserBMI(state.UserData)
  }

  return (
    <div>
      <div>set up calories to show</div>
<Button variant="contained" color="primary" onClick={handleClick}>
  Reload
</Button>
    </div>
  );
}
export default UserSection;
