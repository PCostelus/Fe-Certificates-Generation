import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

import { Box, createTheme, MenuItem, ThemeProvider } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  AddObjectH2,
  BottomButtons,
  Button,
  CustomTextField,
  HrModal,
} from './CertificationsStyles';
import { AN_STUDII, FINANTARE } from '../../utils/constants';
import { getListForDropDown } from '../../utils/utils';

const serverHost = process.env.REACT_APP_SERVER_HOST;
const token = localStorage.getItem('accessToken');

const faculty_id = '940cd01f-0da2-4af3-845a-f84b0c9bd834';
const user_id = 'dbf3dc0c-8cb0-4ba4-8cc8-8d85329d313d';

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

export const ModalAddCertification = (props) => {
  const { showModal, closeModal, faculty } = props;

  const studyDomainsList = getListForDropDown(faculty?.study_domains || []);
  const studyProgramsList = getListForDropDown(faculty?.study_programs || []);
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

  const getBody = () => ({
    study_domain: studyDomain,
    study_program: studyProgram,
    financial_status: financing,
    study_year: studyYear,
    reason,
    faculty_id: decodeToken.faculty,
    user: decodeToken.userId,
  });

  const apiActions = async () => {
    try {
      await axios.post(`${serverHost}/certificate`, getBody());

      closeModal();
      reload();
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  const token = localStorage.getItem('accessToken');

  let decodeToken;
  if (token) {
    decodeToken = jwt_decode(token);
    console.log(decodeToken);
  }

  const reload = () => window.location.reload();

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
                {studyDomainsList &&
                  studyDomainsList.map((option) => (
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
                {studyProgramsList &&
                  studyProgramsList.map((option) => (
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
            <Button onClick={apiActions}>Adauga</Button>
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
