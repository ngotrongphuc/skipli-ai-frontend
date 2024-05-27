import { Box, Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import InputPhone from './InputPhone';
import InputOtp from './InputOtp';
import  { useAuth } from '../../auth/AuthContext';
import { createNewAccessCode, validateAccessCode } from '../../api/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { unformatPhoneNumber } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [isOTPStep, setIsOTPStep] = useState(false);
  const { phoneNumber:storedPhoneNumber, setPhoneNumber: setStoredPhoneNumber } = useAuth();
  const unformatedPhoneNumber = useMemo(()=>unformatPhoneNumber(phoneNumber),[phoneNumber])
  const navigate = useNavigate();

  const handleChangePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleChangeOtp = (newOTP: string) => {
    setOTP(newOTP);
  };

  const submitPhoneNumber = async () => {
    try {
      // await createNewAccessCode({
      //   phoneNumber: unformatedPhoneNumber,
      // });
      setIsOTPStep(true);
    } catch (error) {}
  };

  const submitOtp = async () => {
    try {
      // const result = await validateAccessCode({
      //   accessCode: otp,
      //   phoneNumber: unformatedPhoneNumber,
      // });
      // if(result.success){
        setStoredPhoneNumber(unformatedPhoneNumber);
        navigate('dashboard')
      // }
    } catch (error) {}
  };

  const goBack = () => {
    setIsOTPStep(false);
  };

  useEffect(() => {
    storedPhoneNumber && navigate('dashboard', { replace: true });
  }, []);

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
