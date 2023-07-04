import { Box, Modal } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { BottomButtons, Button } from '../Certifications/CertificationsStyles';

import {
  DeleteModalBody,
  DeleteModalBottom,
  DeleteModalTitle,
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

export const DeleteItemModal = (props) => {
  const { showModal, closeModal, headerText, bodyText, id, apiURL } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const apiActions = async () => {
    try {
      await axios.delete(`${apiURL}/${id}`);

      closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };
  return (
    <>
      <Modal open={showModal} onClose={closeModal}>
        <Box sx={{ ...style, width: 500 }}>
          <DeleteModalTitle>{headerText}</DeleteModalTitle>
          <DeleteModalBody>{bodyText}</DeleteModalBody>
          <DeleteModalBottom>
            <BottomButtons>
              <Button
                onClick={closeModal}
                style={{
                  width: '80px',
                  background: '#f7f5f5',
                  marginRight: '10px',
                  color: 'grey',
                  marginTop: '20px',
                  fontWeight: 'bold',
                }}
              >
                Iesire
              </Button>
              <Button
                onClick={apiActions}
                style={{
                  marginTop: '20px',
                  width: '100px',
                  background: '#b5000f',
                  marginRight: '10px',
                  fontWeight: 'bold',
                }}
              >
                Sterge
              </Button>
            </BottomButtons>
          </DeleteModalBottom>
          {errorMessage && (
            <div
              style={{
                color: 'red',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
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
