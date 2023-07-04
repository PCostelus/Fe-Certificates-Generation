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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search } from '../../pages/CertificateStyle';
import { AddStudentsModal } from './AddStudentsModal';
import { DeleteItemModal } from './DeleteItemModal';

import {
  AddProfessorsButton,
  DisplayInline,
  ProfessorsContainer,
} from './SectionsStyle';

const serverHost = process.env.REACT_APP_SERVER_HOST;
const API_URL = `${serverHost}/user`;

export const StudentsSection = (props) => {
  const [idToDelete, setIdToDelete] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchedStudents, setSearchedStudents] = useState([]);

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
    const newStudents = students.filter((student) => {
      return (
        student.first_name.toLowerCase().includes(searchValue) ||
        student.last_name.toLowerCase().includes(searchValue) ||
        student.faculty.faculty_name.toLowerCase().includes(searchValue) ||
        student.study_domain.toLowerCase().includes(searchValue) ||
        student.study_program.toLowerCase().includes(searchValue) ||
        student.financial_status.toLowerCase().includes(searchValue)
      );
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

  const getFaculties = async () => {
    try {
      const faculties = await axios.get(`${serverHost}/faculty`, {});
      faculties.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      const facultyList = [];
      for (let faculty of faculties.data) {
        facultyList.push({ value: faculty.id, label: faculty.faculty_name });
      }

      setFaculties(facultyList);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getStudents = async () => {
    try {
      const students = await axios.get(`${serverHost}/user/students`, {});
      students.data.sort(
        (a, b) => a.faculty.faculty_name - b.faculty.faculty_name
      );

      setStudents(students.data);
      setSearchedStudents(students.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFaculties();
    getStudents();
  }, []);

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
              <StyledTableCell align='right'>Adresa de email</StyledTableCell>
              <StyledTableCell align='right'>Facultate</StyledTableCell>
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
            {searchedStudents &&
              searchedStudents.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component='th' scope='row'>
                    {row.last_name} {row.father_initial} {row.first_name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.email_address}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      maxWidth: '250px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidded',
                    }}
                    align='right'
                  >
                    {row.faculty.faculty_acronym}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.study_domain}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.study_program}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.study_year}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.financial_status}
                  </StyledTableCell>
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
                          setIdToDelete(row.id);
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
      <AddStudentsModal
        closeModal={closeAddModal}
        showModal={showAddModal}
        faculties={faculties}
      />
      <DeleteItemModal
        closeModal={closeDeleteModal}
        showModal={showDeleteModal}
        bodyText={
          'Datele acestui student vor fi sterse, inclusiv adeverintele si informatiile adaugate de acesta sau de catre admin-ul responsabil!'
        }
        id={idToDelete}
        apiURL={API_URL}
        headerText={'Esti pe cale sa stergi un student'}
      />
    </ProfessorsContainer>
  );
};
