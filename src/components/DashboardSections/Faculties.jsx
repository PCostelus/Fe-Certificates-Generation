import {
  faCalendar,
  faSignal,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddFacultyModal } from './AddFacultyModal';
import {
  BottomDetails,
  CardContainer,
  Details,
  FacultyTitle,
} from './SectionsStyle';

const serverHost = process.env.REACT_APP_SERVER_HOST;

const FacultiesSection = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [faculties, setfaculties] = useState([false]);

  const [faculty, setFaculty] = useState([false]);

  const closeModal = () => {
    setShowModal(false);
  };

  const getFaculties = async () => {
    try {
      const getFaculties = await axios.get(`${serverHost}/faculty`, {});
      getFaculties.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setfaculties(getFaculties.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFaculties();
  }, []);

  return (
    <>
      {faculties &&
        faculties.map((faculty, index) => (
          <CardContainer status={faculty.status} key={index}>
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
                setFaculty(faculty);
                setShowModal(true);
              }}
            />

            <FacultyTitle>
              {faculty.faculty_name} ({faculty.faculty_acronym})
            </FacultyTitle>
            <BottomDetails>
              <Details>
                <FontAwesomeIcon
                  icon={faCalendar}
                  size='1x'
                  color='#213555'
                  style={{
                    marginRight: '8px',
                    color: '213555',
                  }}
                />
                An universitar: {faculty.start_year}/{faculty.end_year}
              </Details>
              <Details>
                <FontAwesomeIcon
                  icon={faSignal}
                  size='1x'
                  color='#213555'
                  style={{
                    marginRight: '8px',
                    color: '213555',
                  }}
                />
                Status: {faculty.status}
              </Details>
            </BottomDetails>
          </CardContainer>
        ))}
      <AddFacultyModal
        closeModal={closeModal}
        showModal={showModal}
        faculty={faculty}
        headerText={'Actualizare facultate'}
        isCreating={false}
      />
    </>
  );
};

export default FacultiesSection;
