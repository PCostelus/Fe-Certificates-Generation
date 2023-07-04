import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
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
import { POSITION_MAPPER } from '../../utils/mappers';
import { AddProfessorModal } from './AddProfessorModal';
import { DeleteItemModal } from './DeleteItemModal';

import {
  AddProfessorsButton,
  DisplayInline,
  ProfessorsContainer,
} from './SectionsStyle';

const serverHost = process.env.REACT_APP_SERVER_HOST;
const API_URL = `${serverHost}/user`;

const ProfessorsSection = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isCreating, setIsCreating] = useState(true);
  const [professors, setProfessors] = useState([]);
  const [searchedProfessors, setSearchedProfessors] = useState([]);
  const [headerText, setHeaderText] = useState('Adaugare cadru didactic');
  const [professor, setProfessor] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (searchValue === '') {
      setSearchedProfessors(professors);
      return;
    }
    const newProfessors = professors.filter((professor) => {
      return (
        professor.first_name.toLowerCase().includes(searchValue) ||
        professor.last_name.toLowerCase().includes(searchValue) ||
        professor.faculty.faculty_name.toLowerCase().includes(searchValue) ||
        professor.status.toLowerCase().includes(searchValue)
      );
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

  const getProfessors = async () => {
    try {
      const professors = await axios.get(`${serverHost}/user/professors`, {});
      professors.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setSearchedProfessors(professors.data);
      setProfessors(professors.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFaculties();
    getProfessors();
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
            setHeaderText('Adaugare cadru didactic');
            setShowAddModal(true);
            setIsCreating(true);
            setProfessor({});
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
                  {row.last_name} {row.first_name}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row.email_address}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {POSITION_MAPPER[row.role]}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row.faculty.faculty_name}
                </StyledTableCell>
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
                        setIsCreating(false);
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
      {isCreating === false ? (
        professors && (
          <AddProfessorModal
            closeModal={closeAddModal}
            showModal={showAddModal}
            professor={professor}
            headerText={headerText}
            isCreating={isCreating}
            faculties={faculties}
          />
        )
      ) : (
        <AddProfessorModal
          closeModal={closeAddModal}
          showModal={showAddModal}
          professor={professor}
          headerText={headerText}
          isCreating={isCreating}
          faculties={faculties}
        />
      )}
      <DeleteItemModal
        closeModal={closeDeleteModal}
        showModal={showDeleteModal}
        bodyText={
          'Toate legaturile acestui cadru didactic cu facultatea si cu adeverintele semnate for fi sterse. Adaugarea din nou a cadrului didactic nu va reface aceste legaturi!'
        }
        headerText={headerText}
        apiURL={API_URL}
        id={idToDelete}
      />
    </ProfessorsContainer>
  );
};

export default ProfessorsSection;
