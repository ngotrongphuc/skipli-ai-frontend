import { Box, Container, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import InputPhone from './InputPhone';
import InputOtp from './InputOtp';
import { useAuth } from '../../auth/AuthContext';
import { createNewAccessCode, validateAccessCode } from '../../api/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { unformatPhoneNumber } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [loadingPhoneNumber, setLoadingPhoneNumber] = useState<boolean>(false);
  const [loadingOTP, setLoadingOTP] = useState<boolean>(false);
  const [isOTPStep, setIsOTPStep] = useState(false);
  const {
    phoneNumber: storedPhoneNumber,
    setPhoneNumber: setStoredPhoneNumber,
  } = useAuth();
  const unformatedPhoneNumber = useMemo(
    () => unformatPhoneNumber(phoneNumber),
    [phoneNumber],
  );
  const navigate = useNavigate();

  const handleChangePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleChangeOtp = (newOTP: string) => {
    setOTP(newOTP);
  };

  const submitPhoneNumber = async () => {
    setLoadingPhoneNumber(true);
    try {
      await createNewAccessCode({
        phoneNumber: unformatedPhoneNumber,
      });
      setIsOTPStep(true);
    } catch (error) {}
    setLoadingPhoneNumber(false);
  };

  const submitOtp = async () => {
    setLoadingOTP(true);
    try {
      const result = await validateAccessCode({
        accessCode: otp,
        phoneNumber: unformatedPhoneNumber,
      });
      if (result.success) {
        setStoredPhoneNumber(unformatedPhoneNumber);
        navigate('dashboard');
      }
    } catch (error) {}
    setLoadingOTP(false);
  };

  const goBack = () => {
    setIsOTPStep(false);
  };

  useEffect(() => {
    storedPhoneNumber && navigate('dashboard', { replace: true });
  }, [storedPhoneNumber, navigate]);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Container
        maxWidth="sm"
        sx={{ position: 'absolute', display: isOTPStep ? 'block' : 'none' }}
      >
        <ArrowBackIcon
          fontSize="large"
          sx={{ mb: 45, cursor: 'pointer' }}
          onClick={goBack}
        />
      </Container>
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          gutterBottom
          fontFamily="dosis"
          fontWeight={600}
          fontSize={60}
        >
          Welcome to Skipli AI
        </Typography>
        {isOTPStep ? (
          <InputOtp
            phoneNumber={phoneNumber}
            otp={otp}
            handleChangeOtp={handleChangeOtp}
            submitOtp={submitOtp}
            loading={loadingOTP}
          />
        ) : (
          <InputPhone
            phoneNumber={phoneNumber}
            handleChangePhoneNumber={handleChangePhoneNumber}
            submitPhoneNumber={submitPhoneNumber}
            loading={loadingPhoneNumber}
          />
        )}
      </Container>
    </Box>
  );
};

export default Login;
