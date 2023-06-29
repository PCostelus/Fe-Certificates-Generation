import {
  faCalendar,
  faSignal,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { AddFacultyModal } from './AddFacultyModal';
import {
  BottomDetails,
  CardContainer,
  Details,
  FacultyTitle,
} from './SectionsStyle';

const FacultiesSection = (props) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <CardContainer>
      <FontAwesomeIcon
        icon={faPenToSquare}
        size='2x'
        color='#213555'
        style={{
          color: '213555',
          marginTop: '25px',
          marginRight: '30px',
          float: 'right',
          cursor: 'pointer',
        }}
        onClick={() => {
          setShowModal(true);
        }}
      />

      <FacultyTitle>
        {props.faculty.name} ({props.faculty.acronym})
      </FacultyTitle>
      <BottomDetails>
        <Details>
          <FontAwesomeIcon
            icon={faCalendar}
            size='x'
            color='#213555'
            style={{
              marginRight: '8px',
              color: '213555',
            }}
          />
          An universitar: {props.faculty.start_year}/{props.faculty.finish_year}
        </Details>
        <Details>
          <FontAwesomeIcon
            icon={faSignal}
            size='x'
            color='#213555'
            style={{
              marginRight: '8px',
              color: '213555',
            }}
          />
          Status: {props.faculty.status}
        </Details>
      </BottomDetails>
      <AddFacultyModal
        closeModal={closeModal}
        showModal={showModal}
        faculty={props.faculty}
        headerText={'Actualizare facultate'}
      />
    </CardContainer>
  );
};

export default FacultiesSection;
