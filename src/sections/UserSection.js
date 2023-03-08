import FoodContext from '../context/food'
import { useContext, useState } from 'react'
import {
   Box,
   Button,
   Divider,
   Grid,
   List,
   ListItem,
   Stack,
   Typography,
} from '@mui/material'

function UserSection() {
   const [open, setOpen] = useState(false)
   const { state, addUserBMI } = useContext(FoodContext)

   const calcBMI = () => {
      const data = state.UserData

      if (data.gender === 'male') {
         return {
            calories:
               (66 + 13.7 * +data.weight + 5 * +data.height - 6.8 * +data.age) *
               data.activity *
               data.yourGoal,
            protein:
               ((66 +
                  13.7 * +data.weight +
                  5 * +data.height -
                  6.8 * +data.age) *
                  data.activity *
                  data.yourGoal *
                  23) /
               100 /
               4,
            carb:
               ((66 +
                  13.7 * +data.weight +
                  5 * +data.height -
                  6.8 * +data.age) *
                  data.activity *
                  data.yourGoal *
                  54) /
               100 /
               4,
            fat:
               ((66 +
                  13.7 * +data.weight +
                  5 * +data.height -
                  6.8 * +data.age) *
                  data.activity *
                  data.yourGoal *
                  23) /
               100 /
               9,
         }
      }
   }

   const handleClick = () => {
      setOpen(true)
      console.log(calcBMI())
      addUserBMI(calcBMI())
   }

   return (
      <Grid
         container
         display='flex'
         flexDirection='column'
         justifyContent='space-between'
         alignItems='center'
         height={'21rem'}
         borderRadius='11px'>
         {/* OPEN MODAL TO SET UP CALORIES */}
         {true && (
            <Button
               align='center'
               variant='contained'
               style={{ marginTop: '120px' }}>
               Enable User Section
            </Button>
         )}
         {false && (
            <Box width='100%'>
               <Typography
                  sx={{
                     borderTopLeftRadius: '9px',
                     borderTopRightRadius: '9px',
                  }}
                  bgcolor={'#4831d4'}
                  color='#fff'
                  variant='body2'
                  align='center'>
                  User Data
               </Typography>

               {!open && <Box></Box>}

               <Box>
                  {state.UserData && !open && (
                     <Box>
                        <Button
                           variant='contained'
                           color='primary'
                           onClick={handleClick}>
                           Click to Show User Section
                        </Button>{' '}
                     </Box>
                  )}

                  {/* REAMAINING CALORIES */}
                  {open && (
                     <Box align='center'>
                        <List>
                           <ListItem>
                              <Typography variant='h6'>REMAINING</Typography>
                           </ListItem>
                           <Divider />
                           {/* calories */}

                           <ListItem>
                              <Box>
                                 {state.UserBMI &&
                                    state.Recipes.reduce((acc, food) => {
                                       return acc - food.TotalNutrition.calories
                                    }, +state.UserBMI.calories)}
                                 /{state.UserBMI.calories}
                              </Box>
                              <Typography variant='overline'>
                                 &nbsp;Calories
                              </Typography>
                           </ListItem>
                           <Divider />
                           {/* Protein */}
                           <ListItem>
                              <Box>
                                 {state.UserBMI &&
                                    state.Recipes.reduce((acc, food) => {
                                       return acc - food.TotalNutrition.protein
                                    }, +state.UserBMI.protein)}
                                 /{state.UserBMI.protein}
                              </Box>
                              <Typography variant='overline'>
                                 &nbsp;Protein
                              </Typography>
                           </ListItem>
                           <Divider />
                           {/* carb */}
                           <ListItem>
                              <Box>
                                 {state.UserBMI &&
                                    state.Recipes.reduce((acc, food) => {
                                       return acc - food.TotalNutrition.carb
                                    }, +state.UserBMI.carb)}
                                 /{state.UserBMI.carb}
                              </Box>
                              <Typography variant='overline'>
                                 &nbsp;Carb
                              </Typography>
                           </ListItem>
                           <Divider />
                           {/* fat */}
                           <ListItem>
                              <Box>
                                 {state.UserBMI &&
                                    state.Recipes.reduce((acc, food) => {
                                       return acc - food.TotalNutrition.fat
                                    }, +state.UserBMI.fat)}
                                 /{state.UserBMI.fat}
                              </Box>
                              <Typography variant='overline'>
                                 &nbsp;Fat
                              </Typography>
                           </ListItem>
                           <Divider />
                        </List>
                     </Box>
                  )}
               </Box>
            </Box>
         )}

         {/* set later */}
         {false && (
            <Button
               size='small'
               variant='contained'
               color='error'>
               Delete Your Data
            </Button>
         )}
      </Grid>
   )
}
export default UserSection
