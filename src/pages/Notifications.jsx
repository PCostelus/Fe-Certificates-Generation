import { useState } from 'react';
import { AddFacultyModal } from '../components/DashboardSections/AddFacultyModal';
import FacultiesSection from '../components/DashboardSections/Faculties';
import ProfessorsSection from '../components/DashboardSections/Professors';
import { StudentsSection } from '../components/DashboardSections/Students';
import { NotificationsCard } from '../components/Notifications/NotificationCard';
import {
  Banner,
  BannerButton,
  Container,
  NavBar,
  SettingsTitle,
} from './DashboardStyle';
import { DisplayCards, NotificationTitle } from './NotificationStyle';

const faculties = [
  {
    acronym: 'FIESC',
    name: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    start_year: 2020,
    finish_year: 2021,
    status: 'complet',
  },
  {
    acronym: 'FIESC',
    name: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    start_year: 2020,
    finish_year: 2021,
    status: 'complet',
  },
  {
    acronym: 'FIESC',
    name: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    start_year: 2020,
    finish_year: 2021,
    status: 'complet',
  },
  {
    acronym: 'FIESC',
    name: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    start_year: 2020,
    finish_year: 2021,
    status: 'complet',
  },
  {
    acronym: 'FIESC',
    name: 'Facultatea de inginerie electrica si stiinta calculatoarelor',
    start_year: 2020,
    finish_year: 2021,
    status: 'complet',
  },
];

export const Notifications = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <NotificationTitle>Notificari</NotificationTitle>
      <DisplayCards>
        {faculties.map((faculty) => (
          <NotificationsCard faculty={faculty} />
        ))}
        {/* <AddFacultyModal
        closeModal={closeModal}
        showModal={showModal}
        faculty={{}}
        headerText={'Adaugare facultate'}
      /> */}
      </DisplayCards>
    </div>
  );
};
