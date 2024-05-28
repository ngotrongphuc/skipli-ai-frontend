import { Button } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import React, { useState } from 'react';
import { saveContent, unsaveContent } from '../api/services';
import { ContentType } from 'utils/types';

const SaveButton = ({ content }: { content: ContentType }) => {
  const { phoneNumber } = useAuth();
  const [contentId, setContentId] = useState<string | null>(
    content.contentId || null,
  );
  const [captionId, setCaptionId] = useState<string | null>(
    content.captionId || null,
  );

  const saveCaption = async () => {
    if (!phoneNumber) return;
    if (contentId && captionId) {
      const { success } = await unsaveContent({
        phoneNumber,
        contentId,
        captionId,
      });
      if (success) {
        content.onDelete?.(contentId, captionId);
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
      variant={captionId ? 'contained' : 'outlined'}
      size="large"
      onClick={saveCaption}
    >
      {captionId ? 'Unsave' : 'Save'}
    </Button>
  );
};

export default SaveButton;
