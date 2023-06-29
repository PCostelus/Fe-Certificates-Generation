import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { AddStudentsModal } from './AddStudentsModal';
import { DeleteItemModal } from './DeleteItemModal';

import {
  AddProfessorsButton,
  DisplayInline,
  ProfessorsContainer,
} from './SectionsStyle';

const students_arr = [
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

export const StudentsSection = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [students, setStudents] = useState(students_arr);
  const [searchedStudents, setSearchedStudents] = useState(students_arr);

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (searchValue === '') {
      setSearchedStudents(students);
      return;
    }
    const newStudents = students.filter((professor) => {
      return professor.nume.toLowerCase().includes(searchValue);
    });
    setSearchedStudents(newStudents);
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
            setShowAddModal(true);
          }}
        >
          Adauga studenti
        </AddProfessorsButton>
      </DisplayInline>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Student</StyledTableCell>
              <StyledTableCell align='right'>Domeniu de studiu</StyledTableCell>
              <StyledTableCell align='right'>
                Programul de studiu
              </StyledTableCell>
              <StyledTableCell align='right'>Anul de studiu</StyledTableCell>
              <StyledTableCell align='right'>Statut Financiar</StyledTableCell>
              <StyledTableCell align='right'>Actiuni</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedStudents.map((row, index) => (
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
      <AddStudentsModal closeModal={closeAddModal} showModal={showAddModal} />
      <DeleteItemModal
        closeModal={closeDeleteModal}
        showModal={showDeleteModal}
        bodyText={
          'Datele acestui student vor fi sterse, inclusiv adeverintele si informatiile adaugate de acesta sau de catre admin-ul responsabil!'
        }
        headerText={'Esti pe cale sa stergi un student'}
      />
    </ProfessorsContainer>
  );
};
