import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';
import CaptionCardItem from './CaptionCardItem';

type GeneratedCaptionsListType = {
  subject: string;
  captionsList: string[];
  loading: boolean;
};

const GeneratedCaptionsList = ({
  subject,
  captionsList,
  loading,
}: GeneratedCaptionsListType) => {
  return (
    <Box>
      <Stack spacing={3}>
        {loading ? (
          <>
            {new Array(5).fill(0).map((_, index: number) => {
              return (
                <Skeleton
                  key={index}
                  variant="rounded"
                  animation="wave"
                  height={100}
                  sx={{ borderRadius: 4 }}
                />
              );
            })}
          </>
        ) : (
          <>
            {captionsList.map((item: string, index: number) => {
              return (
                <CaptionCardItem
                  key={index}
                  content={{ subject, caption: item }}
                />
              );
            })}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default GeneratedCaptionsList;
