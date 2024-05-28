import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';
import { ContentType } from 'utils/types';

const CaptionCardItem = ({ content }: {content: ContentType}) => {
  return (
    <Card
      variant="outlined"
      sx={{ background: '#00000010', borderRadius: 4, p: 2 }}
    >
      <CardContent>
        <Typography fontWeight="600" fontSize={20} fontFamily="dosis">
          {content.caption}
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
