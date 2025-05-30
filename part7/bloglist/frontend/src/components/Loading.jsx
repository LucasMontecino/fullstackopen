import { Box, Button } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        loading
        loadingIndicator="Loading data..."
        sx={{ px: 3, maxWidth: 360 }}
        fullWidth
        variant="outlined"
      >
        Loading data...
      </Button>
    </Box>
  );
};

export default Loading;
