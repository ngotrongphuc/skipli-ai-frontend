import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { InputOtpType } from 'utils/types';

const InputOtp = ({
  phoneNumber,
  otp,
  handleChangeOtp,
  submitOtp,
  loading,
}: InputOtpType) => {
  return (
    <>
      <Typography fontSize={20}>
        Skipli AI has sent an OTP code to: {phoneNumber}
      </Typography>
      <MuiOtpInput length={6} value={otp} onChange={handleChangeOtp} py={2} />
      <LoadingButton
        variant="contained"
        size="large"
        fullWidth
        sx={{ padding: 2 }}
        onClick={submitOtp}
        loading={loading}
      >
        Submit
      </LoadingButton>
    </>
  );
};

export default InputOtp;
