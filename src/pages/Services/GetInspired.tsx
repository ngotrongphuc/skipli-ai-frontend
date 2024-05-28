import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import {
  generateCaptionsFromPostIdea,
  generatePostIdeas,
} from '../../api/services';
import React, { useEffect, useRef, useState } from 'react';
import { GeneratedCaptionsList } from '../../components';

const GetInspired = () => {
  const [formData, setFormData] = useState({
    topic: '',
    idea: '',
  });
  const [ideasList, setIdeasList] = useState<string[]>([]);
  const [captionsList, setCaptionsList] = useState<string[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(false);
  const [loadingCaptions, setLoadingCaptions] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const topicError = hasError && formData.topic.length === 0;
  const ideaError =
    hasError && (formData.idea === '' || formData.idea === null);
  const captionsListAnchorRef = useRef<HTMLDivElement>(null);
  const ideaInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const generateIdeas = async () => {
    if (formData.topic === '') {
      setHasError(true);
      return;
    }
    setLoadingIdeas(true);
    const result = await generatePostIdeas({ topic: formData.topic });
    setLoadingIdeas(false);
    setIdeasList(result);
    ideaInputRef.current?.focus();
  };

  const handleSelectIdea = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    item: any,
  ) => {
    setFormData({ ...formData, idea: item });
  };

  const generateCaptions = async () => {
    if (formData.idea === '' || formData.idea === null) {
      setHasError(true);
      return;
    }
    setLoadingCaptions(true);
    const result = await generateCaptionsFromPostIdea({ idea: formData.idea });
    setLoadingCaptions(false);
    setCaptionsList(result);
  };

  useEffect(() => {
    // scroll to captions list after generated
    const { top }: any = captionsListAnchorRef.current?.getBoundingClientRect();
    window.scrollTo({ top: window.pageYOffset + top - 90, behavior: 'smooth' });
  }, [captionsList]);

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
        Get post ideas and captions for any topic
      </Typography>
      <FormControl error={topicError} sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600" fontFamily="dosis" mb={1}>
          What topic do you want ideas for?
        </Typography>
        <FormHelperText sx={{ fontSize: 15, mt: 1, ml: 0 }}>
          {topicError && '* Please input your topic'}
        </FormHelperText>
        <TextField
          variant="outlined"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          error={topicError}
        />
      </FormControl>
      <FormControl error={ideaError} sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600" fontFamily="dosis" mb={1}>
          Input or generate ideas from your topic
        </Typography>
        <FormHelperText sx={{ fontSize: 15, mt: 1, ml: 0 }}>
          {ideaError && '* Please choose an idea'}
        </FormHelperText>
        <Autocomplete
          disablePortal
          options={ideasList}
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              error={ideaError}
              inputRef={ideaInputRef}
            />
          )}
          onChange={handleSelectIdea}
          openOnFocus
          freeSolo
        />
        <LoadingButton
          loading={loadingIdeas}
          variant="contained"
          size="large"
          onClick={generateIdeas}
          sx={{ width: 'fit-content', alignSelf: 'flex-end' }}
        >
          Generate ideas
        </LoadingButton>
      </FormControl>
      <LoadingButton
        loading={loadingCaptions}
        variant="contained"
        size="large"
        onClick={generateCaptions}
        sx={{ mb: 5 }}
      >
        Generate captions
      </LoadingButton>

      <Typography
        ref={captionsListAnchorRef}
        variant="h4"
        fontWeight="600"
        fontFamily="dosis"
        mb={3}
      >
        Captions generated for you
      </Typography>
      <GeneratedCaptionsList
        subject={formData.idea}
        captionsList={captionsList}
        loading={loadingCaptions}
      />
    </Container>
  );
};

export default GetInspired;
