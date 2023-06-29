import { Box, Modal } from '@mui/material';
import { BottomButtons, Button } from '../Certifications/CertificationsStyles';

import {
  DeleteModalBody,
  DeleteModalBottom,
  DeleteModalTitle,
} from './SectionsStyle';

export const DeleteItemModal = (props) => {
  const { showModal, closeModal, headerText, bodyText } = props;

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
                //   onClick={createObject}
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
        </Box>
      </Modal>
    </>
  );
};
