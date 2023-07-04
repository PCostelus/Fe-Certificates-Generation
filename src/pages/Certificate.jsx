import { CertificationsTable } from '../components/Certifications/CertificationsTable';
import {
  AdeverintePageContainer,
  Buttons,
  PageBar,
  PageTitle,
  Search,
} from './CertificateStyle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { ModalAddCertification } from '../components/Certifications/ModalAddCertification';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const serverHost = process.env.REACT_APP_SERVER_HOST;

const Certificate = (props) => {
  const token = localStorage.getItem('accessToken');

  let decodeToken;
  if (token) {
    decodeToken = jwt_decode(token);
    console.log(decodeToken);
  }

  console.log(props.isAdmin);
  const [showModal, setShowModal] = useState(false);
  const [faculty, setFaculty] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [searchedCertifications, setSearchedCertifications] = useState([]);

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase().trim().toLowerCase();

    if (searchValue === '') {
      setSearchedCertifications(certifications);
      return;
    }
    const newCertifications = certifications.filter((certification) => {
      return certification.student.toLowerCase().includes(searchValue);
    });
    setSearchedCertifications(newCertifications);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getFaculty = async () => {
    try {
      const getFaculty = await axios.get(
        `${serverHost}/faculty/${decodeToken.faculty}`
      );
      setFaculty(getFaculty.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCertificatesF = async () => {
    try {
      const getCertificates = props.isAdmin
        ? await axios.get(`${serverHost}/certificate/`)
        : await axios.get(`${serverHost}/certificate/${decodeToken.userId}`);

      setCertifications(getCertificates.data);
      setSearchedCertifications(getCertificates.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFaculty();
    getCertificatesF();
  }, []);

  return (
    <AdeverintePageContainer>
      <PageTitle>Adeverintele mele</PageTitle>
      <PageBar>
        <Search>
          <TextField
            id='outlined-basic'
            onChange={searchHandler}
            variant='outlined'
            fullWidth
            label='Search'
            size='small'
          />
        </Search>
        {props.isAdmin === false && (
          <Buttons>
            <FontAwesomeIcon
              icon={faCircleArrowDown}
              size='2x'
              color='#213555'
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            />
            <FontAwesomeIcon
              icon={faCirclePlus}
              size='2x'
              color='#213555'
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
              }}
              onClick={() => {
                setShowModal(true);
              }}
            />
          </Buttons>
        )}
      </PageBar>

      <CertificationsTable certifications={searchedCertifications} />

      <ModalAddCertification
        closeModal={closeModal}
        showModal={showModal}
        faculty={faculty}
        headerText={'Obiect pierdut'}
      />
    </AdeverintePageContainer>
  );
};

export default Certificate;
