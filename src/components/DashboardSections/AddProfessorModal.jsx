import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { POZITII_CADRE_DIDACTICE } from '../../utils/constants';
import {
  CustomTextField,
  DisplayInline,
  FacultyActionButton,
  Hr,
  InputComponents,
  ModalTitle,
} from './SectionsStyle';

export const AddProfessorModal = (props) => {
  const { showModal, closeModal, errorMessage, professor, headerText } = props;
  const [firstName, setFirstName] = useState(professor.nume || '');
  const [lastName, setLastName] = useState(professor.name);
  const [emailAddress, setEmailAddress] = useState(professor.adresa_email);
  const [position, setPosition] = useState(professor.start_year);
  const [faculty, setFaculty] = useState(professor.finish_year);
  const [status, setStatus] = useState(professor.finish_year);
  const [password, setPassword] = useState(professor.finish_year);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                {POZITII_CADRE_DIDACTICE.map((option) => (
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
            <FacultyActionButton>Actualizare</FacultyActionButton>{' '}
          </InputComponents>
          {errorMessage && (
            <div
              style={{
                color: 'red',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'center',
                marginTop: 20,
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
