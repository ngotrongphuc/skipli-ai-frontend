import { Box, Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import InputPhone from './InputPhone';
import InputOtp from './InputOtp';
import AuthContext from '../../auth/AuthContext';
import { createNewAccessCode, validateAccessCode } from '../../api/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { unformatPhoneNumber } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [isOTPStep, setIsOTPStep] = useState(false);
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleChangeOtp = (newOTP: string) => {
    setOTP(newOTP);
  };

  const submitPhoneNumber = async () => {
    try {
      await createNewAccessCode({
        phoneNumber: unformatPhoneNumber(phoneNumber),
      });
      setIsOTPStep(true);
    } catch (error) {}
  };

  const submitOtp = async () => {
    try {
      const result = await validateAccessCode({
        accessCode: otp,
        phoneNumber: unformatPhoneNumber(phoneNumber),
      });
      result.success && login();
    } catch (error) {}
  };

  const goBack = () => {
    setIsOTPStep(false);
  };

  useEffect(() => {
    console.log(isLoggedIn);
    isLoggedIn && navigate('/dashboard', { replace: true });
  }, [isLoggedIn]);

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
          sx={{ marginBottom: 45, cursor: 'pointer' }}
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
          />
        ) : (
          <InputPhone
            phoneNumber={phoneNumber}
            handleChangePhoneNumber={handleChangePhoneNumber}
            submitPhoneNumber={submitPhoneNumber}
          />
        )}
      </Container>
    </Box>
  );
};

export default Login;
