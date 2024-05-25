import { Button, Typography } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import React from 'react';

interface InputPhoneNumberProps {
  phoneNumber: string;
  handleChangePhoneNumber: (value: string) => void;
  submitPhoneNumber: () => void;
}

const InputPhone = ({
  phoneNumber,
  handleChangePhoneNumber,
  submitPhoneNumber,
}: InputPhoneNumberProps) => {
  return (
    <>
      <Typography fontSize={20}>
        Enter a mobile phone number that you have access to.
      </Typography>
      <Typography fontSize={20}>
        This number will be used to login to Skipli AI.
      </Typography>
      <MuiTelInput
        value={phoneNumber}
        onChange={handleChangePhoneNumber}
        defaultCountry="VN"
        fullWidth
        sx={{ marginY: 2 }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ padding: 2 }}
        onClick={submitPhoneNumber}
      >
        Send verification code
      </Button>
    </>
  );
};

export default InputPhone;
