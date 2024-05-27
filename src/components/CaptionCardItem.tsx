import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { saveGeneratedContent, unsaveContent } from '../api/services';
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';

const CaptionCardItem = ({ content }: { content: string }) => {
  return (
    <Card
      variant="outlined"
      sx={{ background: '#00000010', borderRadius: 4, p: 2 }}
    >
      <CardContent>
        <Typography fontWeight="600" fontSize={20} fontFamily="dosis">
          {content}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <SaveButton content={content} />
        <ShareButton content={content} />
      </CardActions>
    </Card>
  );
};

export default CaptionCardItem;
