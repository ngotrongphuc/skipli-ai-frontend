import { Box, Button, ClickAwayListener, Tooltip } from '@mui/material';
import { useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
} from 'react-share';
import { ContentType } from 'utils/types';

const TooltipModal = ({ content }: { content: ContentType }) => {
  const shareUrl = 'https://www.skiplinow.com/';

  return (
    <Box px={2} py={1}>
      {/* Facebook no longer allow to share text, only url */}
      <FacebookShareButton url={shareUrl} style={{ marginRight: 20 }}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <EmailShareButton url="" subject={content.subject} body={content.caption}>
        <EmailIcon size={40} round />
      </EmailShareButton>
    </Box>
  );
};

const ShareButton = ({ content }: { content: ContentType }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const openTooltip = () => {
    setTooltipOpen(true);
  };

  const closeTooltip = () => {
    setTooltipOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={closeTooltip}>
      <Tooltip
        title={<TooltipModal content={content} />}
        placement="top"
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        PopperProps={{
          disablePortal: true,
        }}
        open={tooltipOpen}
      >
        <Button
          variant="outlined"
          size="large"
          color="success"
          onClick={openTooltip}
        >
          Share
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default ShareButton;
