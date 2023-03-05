import {
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Card,
  CardActionArea,
  CardHeader,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  createTheme,
  Grid,
} from '@mui/material';
import { useState } from 'react';
function TestSection() {
  const [value, setValue] = useState();
  const [open, setopen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (e, val) => {
    console.log(e);
    console.log(val);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setopen(!open);
    console.log(e.currentTarget);
  };

  const handleClose = () => {
    setopen(false);
  };

  const theme = createTheme({});

  console.log(theme);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={10} lg={6}>
          nikos
        </Grid>
        <Grid item xs={12} md={2} lg={6}>
          pikos
        </Grid>
      </Grid>
    </Box>
  );
}
export default TestSection;
