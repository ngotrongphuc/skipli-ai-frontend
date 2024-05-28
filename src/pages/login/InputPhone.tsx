import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { InputPhoneNumberType } from 'utils/types';

const InputPhone = ({
  phoneNumber,
  handleChangePhoneNumber,
  submitPhoneNumber,
  loading,
}: InputPhoneNumberType) => {
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
      <LoadingButton
        variant="contained"
        size="large"
        fullWidth
        sx={{ padding: 2 }}
        onClick={submitPhoneNumber}
        loading={loading}
      >
        Send verification code
      </LoadingButton>
    </>
  );
};

export default InputPhone;
