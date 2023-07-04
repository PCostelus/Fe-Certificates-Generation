import { useState } from 'react';
import { AddFacultyModal } from '../components/DashboardSections/AddFacultyModal';
import FacultiesSection from '../components/DashboardSections/Faculties';
import ProfessorsSection from '../components/DashboardSections/Professors';
import { StudentsSection } from '../components/DashboardSections/Students';

import {
  Banner,
  BannerButton,
  Container,
  NavBar,
  SettingsTitle,
} from './DashboardStyle';

export const Dashboard = (props) => {
  let { activePage } = props;
  let isFacultiesActive = false;
  let isProfessorsActive = false;
  let isStudentsActive = false;

  switch (activePage) {
    case 'FACULTIES':
      isFacultiesActive = true;
      break;
    case 'PROFESSORS':
      isProfessorsActive = true;
      break;
    case 'STUDENTS':
      isStudentsActive = true;
      break;
    default:
      isFacultiesActive = true;
  }

  const [showModal, setShowModal] = useState(false);
  const [faculties, setFaculties] = useState(isFacultiesActive);
  const [professors, setProfessors] = useState(isProfessorsActive);
  const [students, setStudents] = useState(isStudentsActive);

  const closeModal = () => {
    setShowModal(false);
  };
  if (faculties) {
    window.history.replaceState(null, 'Faculties Page', '/dashboard/facultati');
  }

  return (
    <Container>
      <SettingsTitle>Dashboard</SettingsTitle>
      <NavBar>
        <Banner
          onClick={() => {
            setFaculties(true);
            setProfessors(false);
            setStudents(false);
            console.log(window.location.pathname);
            window.history.replaceState(
              null,
              'Faculties Page',
              '/dashboard/facultati'
            );
          }}
          radius={'left'}
          isActive={faculties}
        >
          Facultati
        </Banner>
        <Banner
          onClick={() => {
            setFaculties(false);
            setProfessors(true);
            setStudents(false);
            console.log(window.location.pathname);
            activePage = 'PROFESSORS';
            window.history.replaceState(
              window.location.pathname,
              'Professors Page',
              '/dashboard/cadre-didactice'
            );
            console.log(window.location.pathname);
          }}
          isActive={professors}
          style={{ borderLeftWidth: 'px', borderRightWidth: 'px' }}
        >
          Cadre didactice
        </Banner>
        <Banner
          onClick={() => {
            setFaculties(false);
            setProfessors(false);
            setStudents(true);
            console.log(window.location.pathname);
            window.history.replaceState(
              window.location.pathname,
              'Students Page',
              '/dashboard/studenti'
            );
          }}
          isActive={students}
          radius={'right'}
        >
          Studenti
        </Banner>
        {faculties && (
          <BannerButton onClick={() => setShowModal(true)}>
            Adauga facultate
          </BannerButton>
        )}
      </NavBar>
      {faculties && <FacultiesSection faculty={{}} />}
      {professors && <ProfessorsSection faculty={{}} />}
      {students && <StudentsSection faculty={{}} />}
      {faculties && (
        <AddFacultyModal
          showModal={showModal}
          closeModal={closeModal}
          headerText={'Adaugare facultate'}
          isCreating={true}
          faculty={{}}
        />
      )}
    </Container>
  );
};
