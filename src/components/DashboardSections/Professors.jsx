import {
  faCalendar,
  faTrash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Search } from '../../pages/AdeverinteStyle';
import { AddProfessorModal } from './AddProfessorModal';
import { DeleteItemModal } from './DeleteItemModal';

import {
  AddProfessorsButton,
  DisplayInline,
  ProfessorsContainer,
} from './SectionsStyle';

const professors_arr = [
  {
    nume: 'Isopescu Maria',
    adresa_email: 'isopescu.maria@usv.ro',
    pozitie: 'secretar-sef',
    facultate: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    status: 'disponibila',
  },
  {
    nume: 'Dimian Andrei',
    adresa_email: 'dimian.andrei@usv.ro',
    pozitie: 'rector',
    facultate: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    status: 'disponibil',
  },
];

const ProfessorsSection = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [professors, setProfessors] = useState(professors_arr);
  const [searchedProfessors, setSearchedProfessors] = useState(professors_arr);
  const [headerText, setHeaderText] = useState('Adaugare cadru didactic');
  const [professor, setProfessor] = useState({});

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setSearchText(searchValue);
    if (searchValue === '') {
      setSearchedProfessors(professors);
      return;
    }
    const newProfessors = professors.filter((professor) => {
      return professor.nume.toLowerCase().includes(searchValue);
    });
    setSearchedProfessors(newProfessors);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#4F709C',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <ProfessorsContainer>
      <DisplayInline style={{ marginBottom: '40px' }}>
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
        <AddProfessorsButton
          onClick={() => {
            setHeaderText('Adaugare cadru didactic');
            setProfessor({});
            setShowAddModal(true);
          }}
        >
          Adauga cadru didactic
        </AddProfessorsButton>
      </DisplayInline>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Cadru Didactic</StyledTableCell>
              <StyledTableCell align='right'>Adresa de email</StyledTableCell>
              <StyledTableCell align='right'>Pozitie</StyledTableCell>
              <StyledTableCell align='right'>Facultate</StyledTableCell>
              <StyledTableCell align='right'>Status</StyledTableCell>
              <StyledTableCell align='right'>Actiuni</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedProfessors.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row'>
                  {row.nume}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row.adresa_email}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.pozitie}</StyledTableCell>
                <StyledTableCell align='right'>{row.facultate}</StyledTableCell>
                <StyledTableCell align='right'>{row.status}</StyledTableCell>
                <StyledTableCell align='right'>
                  <div>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size='x'
                      color='#213555'
                      style={{
                        cursor: 'pointer',
                        marginLeft: '10px',
                      }}
                      onClick={() => {
                        setHeaderText('Actualizare cadru didactic');
                        setProfessor(row);
                        setShowAddModal(true);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      size='x'
                      color='red'
                      style={{
                        cursor: 'pointer',
                        marginLeft: '10px',
                      }}
                      onClick={() => {
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProfessorModal
        closeModal={closeAddModal}
        showModal={showAddModal}
        professor={professor}
        headerText={headerText}
      />
      <DeleteItemModal
        closeModal={closeDeleteModal}
        showModal={showDeleteModal}
        bodyText={
          'Toate legaturile acestui cadru didactic cu facultatea si cu adeverintele semnate for fi sterse. Adaugarea din nou a cadrului didactic nu va reface aceste legaturi!'
        }
        headerText={headerText}
      />
    </ProfessorsContainer>
  );
};

export default ProfessorsSection;
