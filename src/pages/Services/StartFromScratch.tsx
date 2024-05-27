import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { generatePostCaptions } from '../../api/services';
import { CaptionCardItem, CaptionsList } from '../../components';
import { LoadingButton } from '@mui/lab';

const StartFromScratch = () => {
  const [formData, setFormData] = useState({
    socialNetwork: '',
    subject: '',
    tone: '',
  });
  const [captionsList, setCaptionsList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const socialNetworkError = hasError && formData.socialNetwork.length === 0;
  const subjectError = hasError && formData.subject.length === 0;
  const toneError = hasError && formData.tone.length === 0;
  const captionsListAnchorRef = useRef<HTMLDivElement>(null);

  const handleSocialClick = (socialNetwork: string) => {
    setFormData({ ...formData, socialNetwork });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const generateCaption = async () => {
    if (Object.values(formData).some((value: string) => value === '')) {
      setHasError(true);
      return;
    }
    setLoading(true);
    const result = await generatePostCaptions(formData);
    setLoading(false);
    setCaptionsList(result);
  };

  useEffect(() => {
    // scroll to captions list after generated
    const { top }: any = captionsListAnchorRef.current?.getBoundingClientRect();
    window.scrollTo({ top: window.pageYOffset + top - 90, behavior: 'smooth' });
  }, [captionsList]);

  const toneItems = [
    { value: 'friendly', label: 'Friendly' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'professional', label: 'Professional' },
    { value: 'bold', label: 'Bold' },
    { value: 'adventurous', label: 'Adventurous' },
    { value: 'witty', label: 'Witty' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'empathetic', label: 'Empathetic' },
  ];

  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        pb: 3,
      }}
    >
      <Typography variant="h4" fontWeight="600" fontFamily="dosis" mb={3}>
        Generate unique captions from scratch
      </Typography>
      <FormControl sx={{ mb: 3 }} error={socialNetworkError}>
        <Typography variant="h5" fontWeight="600" fontFamily="dosis">
          What kind of post do you want a caption for?
        </Typography>
        <FormHelperText sx={{ fontSize: 15, mb: 2, ml: 0 }}>
          {socialNetworkError && '* Please select a platform'}
        </FormHelperText>
        <Box>
          <Button
            variant={
              formData.socialNetwork === 'facebook' ? 'contained' : 'outlined'
            }
            startIcon={<FacebookIcon sx={{ width: 50, height: 50 }} />}
            sx={{ padding: 3, borderRadius: 4, marginRight: 5 }}
            onClick={() => handleSocialClick('facebook')}
          >
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              Facebook
            </Typography>
          </Button>
          <Button
            variant={
              formData.socialNetwork === 'instagram' ? 'contained' : 'outlined'
            }
            startIcon={<InstagramIcon sx={{ width: 50, height: 50 }} />}
            sx={{ padding: 3, borderRadius: 4, marginRight: 5 }}
            onClick={() => handleSocialClick('instagram')}
          >
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              Instagram
            </Typography>
          </Button>
          <Button
            variant={
              formData.socialNetwork === 'twitter' ? 'contained' : 'outlined'
            }
            startIcon={<TwitterIcon sx={{ width: 50, height: 50 }} />}
            sx={{ padding: 3, borderRadius: 4 }}
            onClick={() => handleSocialClick('twitter')}
          >
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              Twitter
            </Typography>
          </Button>
        </Box>
      </FormControl>
      <FormControl sx={{ mb: 3 }} error={subjectError}>
        <Typography variant="h5" fontWeight="600" fontFamily="dosis">
          What topic do you want a caption for?
        </Typography>
        <FormHelperText sx={{ fontSize: 15, mb: 2, ml: 0 }}>
          {subjectError && '* Please input your topic'}
        </FormHelperText>
        <TextField
          variant="outlined"
          sx={{ mb: 3 }}
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={subjectError}
        />
      </FormControl>
      <FormControl error={toneError} sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600" fontFamily="dosis">
          What should your caption sound like?
        </Typography>
        <FormHelperText sx={{ fontSize: 15, mb: 2, ml: 0 }}>
          {toneError && 'Please select a tone'}
        </FormHelperText>
        <Select name="tone" value={formData.tone} onChange={handleChange}>
          {toneItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LoadingButton
        loading={loading}
        variant="contained"
        size="large"
        onClick={generateCaption}
        sx={{ mb: 5 }}
      >
        Generate caption
      </LoadingButton>

      <Typography
        ref={captionsListAnchorRef}
        variant="h4"
        fontWeight="600"
        fontFamily="dosis"
        mb={4}
      >
        Captions generated for you
      </Typography>
      <CaptionsList captionsList={captionsList} loading={loading} />
    </Container>
  );
};

export default StartFromScratch;
