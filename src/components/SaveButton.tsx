import { Button } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import React, { useState } from 'react';
import { saveGeneratedContent, unsaveContent } from '../api/services';

const SaveButton = ({ content }: { content: string }) => {
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
    <Button
      variant={captionId ? 'contained' : 'outlined'}
      size="large"
      onClick={saveCaption}
    >
      {captionId ? 'Saved' : 'Save'}
    </Button>
  );
};

export default SaveButton;
