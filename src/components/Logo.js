import { Box } from '@mui/material';

function Logo({ src, alt }) {
  return (
    <Box
    display={"flex"}
    justifyContent="center"
    
    >
      <img src={src} alt={alt} style={{ width: '190px' }} />
    </Box>
  );
}
export default Logo;
