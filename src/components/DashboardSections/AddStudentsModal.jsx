import { Box, MenuItem, Modal } from '@mui/material';
import { BottomButtons, Button } from '../Certifications/CertificationsStyles';
import { useState } from 'react';
import {
  CustomTextField,
  Uploader,
  UploadStudentsModalTitle,
} from './SectionsStyle';
import CSVUploader from './CSVUploader.jsx';
import { STUDENTS_MAPPER } from '../../utils/mappers';
import axios from 'axios';

const serverHost = process.env.REACT_APP_SERVER_HOST;

export const AddStudentsModal = (props) => {
  const { showModal, closeModal, faculties } = props;
  console.log(faculties);

  const [CSVData, setCSVData] = useState([]);
  const [faculty, setFaculty] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFaculty = (e) => {
    setErrorMessage('');
    setFaculty(e.target.value);
  };

  const close = () => {
    setErrorMessage('');
    closeModal();
  };

  const uploadCSV = async () => {
    if (faculty === '') {
      setErrorMessage('Facultatea este obligatorie');
      return null;
    }
    if (CSVData.length === 0 || CSVData?.data?.length === 0) {
      setErrorMessage('Nu este nimic de uploadat');
      return null;
    }
    const uploadedData = [];
    const columns = CSVData.data[0];
    CSVData.data.shift();

    for (let csvRow of CSVData.data) {
      if (csvRow.length === 9) {
        const obj = {};
        for (let i = 0; i < csvRow.length; i++) {
          obj[STUDENTS_MAPPER[columns[i]]] = csvRow[i];
        }
        obj['faculty'] = faculty;
        uploadedData.push(obj);
      }
    }

    try {
      await axios.post(`${serverHost}/user/students`, uploadedData);

      closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
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

  return (
    <>
      <Modal open={showModal} onClose={close}>
        <Box sx={{ ...style, width: 500 }}>
          <UploadStudentsModalTitle>Incarca CSV</UploadStudentsModalTitle>
          <Uploader>
            <CSVUploader setCSVData={setCSVData} />
            <CustomTextField
              label='Facultate'
              select
              variant='outlined'
              size='small'
              margin='normal'
              value={faculty}
              onChange={handleFaculty}
              style={{ marginTop: '30px' }}
            >
              {faculties &&
                faculties.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </CustomTextField>
          </Uploader>

          <BottomButtons>
            <Button
              onClick={close}
              style={{
                width: '80px',
                background: 'grey',
                marginRight: '10px',
                marginBottom: '20px',
              }}
            >
              Iesire
            </Button>
            <Button
              style={{
                marginRight: '30px',
                marginBottom: '20px',
              }}
              onClick={uploadCSV}
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
