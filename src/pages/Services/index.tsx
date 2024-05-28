import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import React from 'react';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const goToStartFromScratch = () => {
    navigate('../services/start-from-scratch');
  };

  const goToGetInspired = () => {
    navigate('../services/get-inspired');
  };

  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="600"
        fontFamily="dosis"
        mb={5}
      >
        Generate post ideas and captions in seconds
      </Typography>
      <Button
        variant="outlined"
        startIcon={<DesignServicesIcon sx={{ width: 50, height: 50 }} />}
        sx={{
          padding: 3,
          borderRadius: 4,
          width: 700,
          mb: 5,
        }}
        onClick={goToStartFromScratch}
      >
        <Box textAlign="start" flex={1}>
          <Typography variant="h5" gutterBottom>
            Start from scratch
          </Typography>
          <Typography variant="body1">
            Generate creative captions on the subject of your choice
          </Typography>
        </Box>
      </Button>
      <Button
        variant="outlined"
        startIcon={<EmojiObjectsIcon sx={{ width: 50, height: 50 }} />}
        sx={{ padding: 3, borderRadius: 4, width: 700 }}
        onClick={goToGetInspired}
      >
        <Box
          textAlign="start"
          flex={1}
          alignItems="start"
          justifyContent="start"
        >
          <Typography variant="h5" gutterBottom>
            Get inspired
          </Typography>
          <Typography variant="body1">
            Generate post ideas and captions for it
          </Typography>
        </Box>
      </Button>
    </Container>
  );
};

export default Services;
