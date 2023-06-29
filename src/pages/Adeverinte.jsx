import { CertificationsTable } from '../components/Certifications/CertificationsTable';
import {
  AdeverintePageContainer,
  Buttons,
  PageBar,
  PageTitle,
  Search,
} from './AdeverinteStyle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { ModalAddCertification } from '../components/Certifications/ModalAddCertification';

const certifications_arr = [
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'approved',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'pending',
  },
  {
    nr_inregistrare: 'f45gs',
    student: 'Ionel Alsei',
    data_inregistarii: '24.08.2021',
    an_studiu: '3',
    program_studii: 'Calculatoare',
    motiv: 'Eliberarea bursei',
    status: 'rejected',
  },
];

const Adeverinte = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [certifications, setCertifications] = useState(certifications_arr);
  const [searchedCertifications, setSearchedCertifications] =
    useState(certifications_arr);

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase().trim().toLowerCase();
    setSearchText(searchValue);
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
        <Buttons>
          <FontAwesomeIcon
            icon={faCircleArrowDown}
            size='2x'
            color='#213555'
            style={{
              cursor: 'pointer',
              marginLeft: '10px',
            }}
            // onClick={() => {
            //   setShowModalAdd(true);
            // }}
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
      </PageBar>

      <CertificationsTable certifications={searchedCertifications} />

      <ModalAddCertification
        closeModal={closeModal}
        showModal={showModal}
        // item={sendItemToModal}
        headerText={'Obiect pierdut'}
      />
    </AdeverintePageContainer>
  );
};

export default Adeverinte;
