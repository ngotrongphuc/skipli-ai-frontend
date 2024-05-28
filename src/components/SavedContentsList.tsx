import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import CaptionCardItem from './CaptionCardItem';
import { ContentsListType } from 'utils/types';

type SavedContentsListType = {
  contentsList: ContentsListType;
  loading: boolean;
  onDelete: (contentId: string, captionId: string) => void;
};

const SavedContentsList = ({
  contentsList,
  loading,
  onDelete,
}: SavedContentsListType) => {
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
        <Box>
          {Object.keys(contentsList).map((contentId: string) => {
            return (
              <Box key={contentId} mb={5}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  fontFamily="dosis"
                  mb={1}
                >
                  {contentsList[contentId].subject}
                </Typography>
                <Stack spacing={3}>
                  {Object.keys(contentsList[contentId].captions).map(
                    (captionId: string) => {
                      return (
                        <CaptionCardItem
                          key={captionId}
                          content={{
                            subject: contentsList[contentId].subject,
                            caption:
                              contentsList[contentId].captions[captionId],
                            contentId,
                            captionId,
                            onDelete,
                          }}
                        />
                      );
                    },
                  )}
                </Stack>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SavedContentsList;
