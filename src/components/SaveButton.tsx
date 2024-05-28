import { Button } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import React, { useState } from 'react';
import { saveContent, unsaveContent } from '../api/services';

type ContentType = {
  content: {
    subject: string;
    caption: string;
  };
};

const SaveButton = ({ content }: ContentType) => {
  const { phoneNumber } = useAuth();
  const [contentId, setContentId] = useState<string | null>(null);
  const [captionId, setCaptionId] = useState<string | null>(null);

  const saveCaption = async () => {
    if (!phoneNumber) return;
    if (contentId && captionId) {
      const { success } = await unsaveContent({
        phoneNumber,
        contentId,
        captionId,
      });
      if (success) {
        setContentId(null);
        setCaptionId(null);
      }
    } else {
      const { success, contentId, captionId } = await saveContent({
        ...content,
        phoneNumber,
      });
      if (success) {
        setContentId(contentId);
        setCaptionId(captionId);
      }
    }
  };

  return (
    <Button
      variant={contentId ? 'contained' : 'outlined'}
      size="large"
      onClick={saveCaption}
    >
      {contentId ? 'Saved' : 'Save'}
    </Button>
  );
};

export default SaveButton;
