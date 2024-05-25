import { Button, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React from 'react';

interface InputOtpProps {
  phoneNumber: string;
  otp: string;
  handleChangeOtp: (value: string) => void;
  submitOtp: () => void;
}

const InputOtp = ({
  phoneNumber,
  otp,
  handleChangeOtp,
  submitOtp,
}: InputOtpProps) => {
  return (
    <>
      <Typography fontSize={20}>
        Skipli AI has sent an OTP code to: {phoneNumber}
      </Typography>
      <MuiOtpInput length={6} value={otp} onChange={handleChangeOtp} py={2} />
      <Button
        variant="contained"
        fullWidth
        sx={{ padding: 2 }}
        onClick={submitOtp}
      >
        Submit
      </Button>
    </>
  );
};

export default InputOtp;
