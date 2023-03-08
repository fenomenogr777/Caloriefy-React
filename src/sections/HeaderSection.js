import Logo from '../components/Logo'
import logoImage from '../images/logo.png'
import SearchBar from '../components/SearchBar'
import { Grid } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { IconButton } from '@mui/material'
import { useRef, useState } from 'react'
import ExerciseModalSection from './ExerciseModalSection'
import CaloriesModalSection from './CaloriesModalSection'

function HeaderSection() {
   const [openCalorie, setOpenCalorie] = useState(false)

   const divEl2 = useRef()

   const openModal = e => {
      if (divEl2.current.contains(e.target)) {
         setOpenCalorie(!openCalorie)
      }
   }

   const closeModal = () => {
      setOpenCalorie(false)
   }

   return (
      //
      <Grid
         container
         display={'flex'}
         justifyContent='space-between'
         alignItems={'center'}
         gap='1rem'>
         {/* LOGO (1) */}
         <Grid
            item
            lg={'auto'}
            md={'auto'}
            sm={'auto'}
            xs={12}>
            <Logo
               src={logoImage}
               alt='website logo'
            />
         </Grid>

         {/* SEARCHBAR (2) */}
         <Grid
            item
            lg={'auto'}
            md={'auto'}
            sm={'auto'}
            xs={12}
            align={'center'}>
            <SearchBar />
         </Grid>

         {/* MODALS  (3) */}
         <Grid
            item
            lg={'auto'}
            md={'auto'}
            sm={'auto'}
            xs={12}
            align={'center'}>
            {/* ICON BUTTON (A) */}

            {/* ICON BUTTON (B) */}
            <IconButton
               ref={divEl2}
               onClick={openModal}>
               <MenuBookIcon
                  color='primary'
                  fontSize='large'
               />
               <CaloriesModalSection
                  isOpen={openCalorie}
                  closeModal={closeModal}
               />
            </IconButton>
         </Grid>
         {/*  */}
      </Grid>
   )
}
export default HeaderSection
