import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  createTheme,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { POZITII_CADRE_DIDACTICE } from '../../utils/constants';
import { ROLE_MAPPER, ROLE_MAPPER_ID } from '../../utils/mappers';
import {
  CustomTextField,
  DisplayInline,
  FacultyActionButton,
  Hr,
  InputComponents,
  ModalTitle,
} from './SectionsStyle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '15px',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};
const serverHost = process.env.REACT_APP_SERVER_HOST;

export const AddProfessorModal = (props) => {
  const {
    showModal,
    closeModal,
    isCreating,
    professor,
    headerText,
    faculties,
  } = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState(professor.first_name || '');
  const [lastName, setLastName] = useState(professor.last_name || '');
  const [emailAddress, setEmailAddress] = useState(
    professor.email_address || ''
  );
  const [position, setPosition] = useState(
    ROLE_MAPPER_ID[professor.role] || ''
  );
  const [faculty, setFaculty] = useState(professor.faculty?.id || '');
  const [status, setStatus] = useState(professor.status || '');
  const [password, setPassword] = useState('');
  console.log(professor);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };

  const handlePosition = (e) => {
    console.log(e.target.value);
    setPosition(e.target.value);
  };

  const handleFaculty = (e) => {
    setFaculty(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const getBody = () => ({
    first_name: firstName,
    last_name: lastName,
    email_address: emailAddress,
    role: ROLE_MAPPER[position],
    status: status,
    password: password,
    faculty: faculty,
  });

  console.log(isCreating);
  const apiActions = async () => {
    try {
      isCreating
        ? await axios.post(`${serverHost}/user`, getBody())
        : await axios.patch(`${serverHost}/user/${professor.id}`, getBody());

      closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    setFirstName(professor.first_name || '');
    setLastName(professor.last_name || '');
    setLastName(professor.last_name || '');
    setEmailAddress(professor.email_address || '');
    setPosition(ROLE_MAPPER_ID[professor.role] || '');
    setFaculty(professor.faculty?.id || '');
    setStatus(professor.status || '');
    setPassword('');
  }, [
    professor.email_address,
    professor.faculty?.id,
    professor.first_name,
    professor.last_name,
    professor.role,
    professor.status,
  ]);

  return (
    <>
      <Modal open={showModal} onClose={closeModal}>
        <Box sx={{ ...style, width: 500 }}>
          <ModalTitle>{headerText}</ModalTitle>
          <Hr />
          <ThemeProvider theme={theme}>
            <InputComponents>
              <DisplayInline style={{ marginBottom: '0px' }}>
                <CustomTextField
                  label='Nume'
                  variant='outlined'
                  size='small'
                  margin='normal'
                  value={lastName}
                  style={{ marginRight: '10px' }}
                  onChange={handleLastName}
                />
                <CustomTextField
                  label='Prenume'
                  variant='outlined'
                  size='small'
                  margin='normal'
                  value={firstName}
                  style={{ marginLeft: '10px' }}
                  onChange={handleFirstName}
                />
              </DisplayInline>
              <CustomTextField
                label='Adresa de email'
                type={'email'}
                variant='outlined'
                size='small'
                margin='normal'
                value={emailAddress}
                onChange={handleEmailAddress}
              />
              <CustomTextField
                label='Pozitie'
                select
                variant='outlined'
                size='small'
                margin='normal'
                value={position}
                onChange={handlePosition}
              >
                {POZITII_CADRE_DIDACTICE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomTextField
                label='Facultate'
                select
                variant='outlined'
                size='small'
                margin='normal'
                value={faculty}
                onChange={handleFaculty}
              >
                {faculties.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomTextField
                label='Status'
                variant='outlined'
                size='small'
                margin='normal'
                value={status}
                onChange={handleStatus}
              />
              <CustomTextField
                label='Parola'
                type={showPassword ? 'text' : 'password'}
                variant='outlined'
                size='small'
                margin='normal'
                value={password}
                style={{ marginBottom: '25px' }}
                onChange={handlePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </InputComponents>
          </ThemeProvider>
          <Hr />
          <InputComponents>
            <FacultyActionButton onClick={apiActions}>
              {isCreating ? 'Creare' : 'Actualizare'}
            </FacultyActionButton>{' '}
          </InputComponents>
          {errorMessage && (
            <div
              style={{
                color: 'red',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              {errorMessage}
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};
const theme = createTheme({
  overrides: {
    MuiFormControl: {
      root: {
        width: '100%',
        marginTop: 20,
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '1.4rem',
        fontWeight: 500,
      },
    },

    MuiInputLabel: {
      root: {
        fontSize: '1.4rem',
        '&$focused': {
          color: 'green',
          fontSize: '1.2rem',
        },
      },

      shrink: {
        fontSize: '1.6rem',
        '&$focused': {
          fontSize: '1.6rem',
        },
      },
    },
  },
});
