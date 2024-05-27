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

type CaptionCardItemProps = {
  content: string;
  index: number;
};

const CaptionCardItem = ({ content, index }: CaptionCardItemProps) => {
  const { phoneNumber } = useAuth();
  const [captionId, setCaptionId] = useState<string | null>(null);

  const saveCaption = async () => {
    if (!phoneNumber) return;
    if (captionId) {
      const { success } = await unsaveContent({ phoneNumber, captionId });
      success && setCaptionId(null);
    } else {
      const { success, captionId } = await saveGeneratedContent({
        phoneNumber,
        caption: content,
      });
      success && setCaptionId(captionId);
    }
  };

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
        <Button
          variant={captionId ? 'contained' : 'outlined'}
          size="large"
          onClick={saveCaption}
        >
          {captionId ? 'Saved' : 'Save'}
        </Button>
        <Button variant="outlined" size="large" color="success">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default CaptionCardItem;
