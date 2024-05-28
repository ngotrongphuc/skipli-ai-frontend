import { Container, Typography } from '@mui/material';
import { getUserGeneratedContent } from '../../api/profile';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { SavedContentsList } from '../../components';
import { ContentsListType } from 'utils/types';

const Profile = () => {
  const [contentsList, setContentsList] = useState<ContentsListType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { phoneNumber } = useAuth();

  const fetchUserGeneratedContent = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    const result = await getUserGeneratedContent({ phoneNumber });
    setContentsList(result);
    setLoading(false);
  };

  // remove caption from user's view after delete
  const onDelete = (contentId: string, captionId: string) => {
    const newContentsList = { ...contentsList };
    delete newContentsList[contentId]['captions'][captionId];
    if (Object.keys(newContentsList[contentId]['captions']).length === 0) {
      delete newContentsList[contentId];
    }
    setContentsList(newContentsList);
  };

  useEffect(() => {
    fetchUserGeneratedContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" fontWeight="600" fontFamily="dosis" mb={5}>
        Saved contents
      </Typography>
      <SavedContentsList
        contentsList={contentsList}
        loading={loading}
        onDelete={onDelete}
      />
    </Container>
  );
};

export default Profile;
