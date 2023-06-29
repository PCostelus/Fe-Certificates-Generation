import { Box, Modal } from '@mui/material';
import { BottomButtons, Button } from '../Certifications/CertificationsStyles';

import {
  DeleteModalBody,
  DeleteModalBottom,
  DeleteModalTitle,
  ModalTitle,
  Uploader,
  UploadStudentsModalTitle,
} from './SectionsStyle';

import CSVUploader from './CSVUploader.jsx';
import { useState } from 'react';

export const AddStudentsModal = (props) => {
  const { showModal, closeModal, headerText, bodyText } = props;

  const [CSVData, setCSVData] = useState([]);

  const uploadCSV = () => {
    console.log(CSVData);
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
      <Modal open={showModal} onClose={closeModal}>
        <Box sx={{ ...style, width: 500 }}>
          <UploadStudentsModalTitle>Incarca CSV</UploadStudentsModalTitle>
          <Uploader>
            <CSVUploader setCSVData={setCSVData} />
          </Uploader>

          <BottomButtons>
            <Button
              onClick={closeModal}
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
        </Box>
      </Modal>
    </>
  );
};
