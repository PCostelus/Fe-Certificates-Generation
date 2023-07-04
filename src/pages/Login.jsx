import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import logo from '../images/usv-logo.png';
import jwt_decode from 'jwt-decode';

import {
  CardSubTitle,
  CardTitle,
  CustomTextField,
  LoginButton,
  LoginCard,
  LoginLogo,
  LoginPageContainer,
} from './LoginStyle';
import axios from 'axios';

const serverHost = process.env.REACT_APP_SERVER_HOST;

export const Login = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmailAddress = (e) => setEmailAddress(e.target.value);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async () => {
    try {
      const login = await axios.post(`${serverHost}/auth/login`, {
        email_address: emailAddress,
        password,
      });

      setErrorMessage('');
      localStorage.setItem('accessToken', login.data.access_token);
      const decodeToken = jwt_decode(login.data.access_token);

      props.setAuthenticated(true);
      props.setRole(decodeToken.role);

      if (decodeToken.role === 0) {
        navigate('/dashboard');
        props.setIsAdmin(true);
      } else if (decodeToken.role === 4) {
        navigate('/adeverinte');
        props.setIsAdmin(false);
      } else {
        navigate('/notificari');
        props.setIsAdmin(false);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Neautorizat');
    }
  };

  return (
    <LoginPageContainer>
      <div>
        <LoginLogo style={{ height: '50px' }} src={logo} alt='Logo' />
        <LoginCard>
          <CardTitle>Bine ai venit</CardTitle>
          <CardSubTitle>Introdu credentialele pentru a te conecta</CardSubTitle>
          <CustomTextField
            label='Adresa de email'
            type={'email'}
            variant='outlined'
            size='normal'
            style={{ width: '70%', marginTop: '20px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FontAwesomeIcon icon={faEnvelope} size='x' color='#213555' />
                </InputAdornment>
              ),
            }}
            value={emailAddress}
            onChange={handleEmailAddress}
          />
          <CustomTextField
            label='Adresa de email'
            type={showPassword ? 'text' : 'password'}
            variant='outlined'
            size='normal'
            margin='normal'
            style={{ width: '70%', marginTop: '30px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FontAwesomeIcon icon={faLock} size='x' color='#213555' />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={handlePassword}
          />

          <LoginButton onClick={handleSubmit}>Inregistreaza-te</LoginButton>
          {errorMessage && (
            <div
              style={{
                color: 'red',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'center',
                marginTop: 5,
              }}
            >
              {errorMessage}
            </div>
          )}
        </LoginCard>
      </div>
    </LoginPageContainer>
  );
};
