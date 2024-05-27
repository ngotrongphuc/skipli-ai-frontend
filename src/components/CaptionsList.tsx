import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';
import CaptionCardItem from './CaptionCardItem';

const CaptionsList = ({
  captionsList,
  loading,
}: {
  captionsList: string[];
  loading: boolean;
}) => {
  return (
    <Box>
      {loading ? (
        <Stack spacing={3}>
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
        </Stack>
      ) : (
        <Stack spacing={3}>
          {captionsList.map((item: string, index: number) => {
            return <CaptionCardItem key={index} content={item} index={index} />;
          })}
        </Stack>
      )}
    </Box>
  );
};

export default CaptionsList;
