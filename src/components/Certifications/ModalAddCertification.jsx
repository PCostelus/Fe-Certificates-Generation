import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

import { Box, createTheme, MenuItem, ThemeProvider } from '@mui/material';
// import { Button } from '../../common/Button';
// import { checkALlFields, validateRomanianNumber } from '../../common/utils';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import {
  AddObjectH2,
  BottomButtons,
  Button,
  CustomTextField,
  HrModal,
} from './CertificationsStyles';
import {
  AN_STUDII,
  DOMENII_STUDII,
  FINANTARE,
  PROGRAME_STUDII,
} from '../../utils/constants';

const serverHost = process.env.REACT_APP_SERVER_HOST;
const token = localStorage.getItem('accessToken');

export const ModalAddCertification = (props) => {
  const { showModal, closeModal } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [reason, setReason] = useState('');
  const [studyDomain, setStudyDomain] = useState('');
  const [studyProgram, setStudyProgram] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [financing, setFinancing] = useState('');

  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleStudyDomain = (e) => {
    setStudyDomain(e.target.value);
  };

  const handleStudyProgram = (e) => {
    setStudyProgram(e.target.value);
  };

  const handleStudyYear = (e) => {
    setStudyYear(e.target.value);
  };

  const handleFinancing = (e) => {
    setFinancing(e.target.value);
  };

  const handleCloseModal = () => {
    closeModal();
    setErrorMessage('');
  };

  const reload = () => window.location.reload();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <Modal open={showModal} onClose={closeModal}>
        <Box sx={{ ...style, width: 500 }}>
          <AddObjectH2>Adeverinta noua</AddObjectH2>
          <HrModal />
          <div style={{ width: '80%', margin: 'auto' }}>
            <ThemeProvider theme={theme}>
              <CustomTextField
                label='Domeniul De Studiu'
                select
                variant='outlined'
                size='small'
                margin='normal'
                value={studyDomain}
                onChange={handleStudyDomain}
              >
                {DOMENII_STUDII.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomTextField
                label='Programul De Studiu'
                select
                variant='outlined'
                size='small'
                margin='normal'
                value={studyProgram}
                onChange={handleStudyProgram}
              >
                {PROGRAME_STUDII.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomTextField
                label='Anul De Studiu'
                select
                variant='outlined'
                size='small'
                margin='normal'
                value={studyYear}
                onChange={handleStudyYear}
              >
                {AN_STUDII.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomTextField
                label='Finantare'
                select
                variant='outlined'
                size='small'
                margin='normal'
                value={financing}
                onChange={handleFinancing}
              >
                {FINANTARE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>

              <CustomTextField
                label='Motiv'
                style={{ marginBottom: '15px' }}
                multiline
                minRows={2}
                maxRows={4}
                variant='outlined'
                size='small'
                margin='normal'
                value={reason}
                onChange={handleReason}
              />
            </ThemeProvider>
          </div>
          <HrModal />
          <BottomButtons>
            <Button
              onClick={handleCloseModal}
              style={{ width: '80px', background: 'grey', marginRight: '10px' }}
            >
              Iesire
            </Button>
            <Button
            //   onClick={createObject}
            >
              Adauga
            </Button>
          </BottomButtons>
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
