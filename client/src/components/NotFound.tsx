// src/pages/NotFound.tsx
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={3}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );
}
