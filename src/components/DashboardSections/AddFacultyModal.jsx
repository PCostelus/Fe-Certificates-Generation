import {
  Box,
  Chip,
  createTheme,
  FormControl,
  MenuItem,
  Modal,
} from '@mui/material';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { aniStudiu } from '../../utils/utils';
import {
  CustomTextField,
  DisplayInline,
  FacultyActionButton,
  Hr,
  InputComponents,
  ModalTitle,
} from './SectionsStyle';

const ANI_STUDIU = aniStudiu();

export const AddFacultyModal = (props) => {
  const { showModal, closeModal, errorMessage, faculty, headerText } = props;
  const [name, setName] = useState(faculty.name);
  const [acronym, setAcronym] = useState(faculty.acronym);
  const [startYear, setStartYear] = useState(faculty.start_year);
  const [finishYear, setFinishYear] = useState(faculty.finish_year);

  const [studyDomainsValues, setStudyDomainsValues] = useState([]);
  const [studyDomainsCurrValue, setStudyDomainsCurrValue] = useState('');

  const [studyProgramsValues, setStudyProgramsValues] = useState([]);
  const [studyProgramsCurrValue, setStudyProgramsCurrValue] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };

  const handleStartYear = (e) => {
    setStartYear(e.target.value);
    setFinishYear(e.target.value + 1);
  };

  const handleFinishYear = (e) => {
    setFinishYear(e.target.value);
    setStartYear(e.target.value - 1);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAcronym = (e) => {
    setAcronym(e.target.value);
  };

  const handleDeleteStudyDomain = (item, index) => {
    let arr = [...studyDomainsValues];
    arr.splice(index, 1);
    setStudyDomainsValues(arr);
  };

  const handleStudyDomainsChange = (e) => {
    setStudyDomainsCurrValue(e.target.value);
  };

  const handleDeleteStudyProgram = (item, index) => {
    let arr = [...studyProgramsValues];
    arr.splice(index, 1);
    setStudyProgramsValues(arr);
  };

  const handleStudyProgramsChange = (e) => {
    setStudyProgramsCurrValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      setStudyDomainsValues((oldState) => [...oldState, e.target.value]);
      setStudyDomainsCurrValue('');
    }
  };

  const handleKeyUpPrograms = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      setStudyProgramsValues((oldState) => [...oldState, e.target.value]);
      setStudyProgramsCurrValue('');
    }
  };

  return (
    <>
      <Modal open={showModal} onClose={closeModal}>
        <Box sx={{ ...style, width: 500 }}>
          <ModalTitle>{headerText}</ModalTitle>
          <Hr />
          <ThemeProvider theme={theme}>
            <InputComponents>
              <CustomTextField
                label='Nume'
                variant='outlined'
                size='small'
                margin='normal'
                value={name}
                onChange={handleName}
              />
              <CustomTextField
                label='Acronim'
                variant='outlined'
                size='small'
                margin='normal'
                value={acronym}
                onChange={handleAcronym}
              />
              <DisplayInline>
                <CustomTextField
                  label='Anul inceperii'
                  select
                  variant='outlined'
                  size='small'
                  margin='normal'
                  style={{ marginRight: '10px' }}
                  value={startYear}
                  onChange={handleStartYear}
                >
                  {ANI_STUDIU.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
                <CustomTextField
                  label='Anul terminarii'
                  select
                  variant='outlined'
                  size='small'
                  margin='normal'
                  style={{ marginLeft: '10px' }}
                  value={finishYear}
                  onChange={handleFinishYear}
                >
                  {ANI_STUDIU.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </DisplayInline>
              <FormControl style={{ width: '100%', marginBottom: '15px' }}>
                <div className={'container'}>
                  {studyDomainsValues.map((item, index) => (
                    <Chip
                      size='small'
                      onDelete={() => handleDeleteStudyDomain(item, index)}
                      label={item}
                    />
                  ))}
                </div>
                <CustomTextField
                  label='Domenii de studiu'
                  variant='outlined'
                  size='small'
                  margin='normal'
                  value={studyDomainsCurrValue}
                  onChange={handleStudyDomainsChange}
                  onKeyDown={handleKeyUp}
                />
              </FormControl>

              <FormControl style={{ width: '100%' }}>
                <div className={'container'}>
                  {studyProgramsValues.map((item, index) => (
                    <Chip
                      size='small'
                      onDelete={() => handleDeleteStudyProgram(item, index)}
                      label={item}
                    />
                  ))}
                </div>
                <CustomTextField
                  label='Programe de studiu'
                  variant='outlined'
                  size='small'
                  margin='normal'
                  value={studyProgramsCurrValue}
                  onChange={handleStudyProgramsChange}
                  onKeyDown={handleKeyUpPrograms}
                />
              </FormControl>
            </InputComponents>
          </ThemeProvider>
          <Hr />
          <InputComponents>
            <FacultyActionButton>Actualizare</FacultyActionButton>
          </InputComponents>
          {errorMessage && (
            <div
              style={{
                color: 'red',
                fontWeight: '600',
                fontSize: '13px',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              {errorMessage}
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};
const theme = createTheme({
  overrides: {
    MuiFormControl: {
      root: {
        width: '100%',
        marginTop: 20,
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '1.4rem',
        fontWeight: 500,
      },
    },

    MuiInputLabel: {
      root: {
        fontSize: '1.4rem',
        '&$focused': {
          color: 'green',
          fontSize: '1.2rem',
        },
      },

      shrink: {
        fontSize: '1.6rem',
        '&$focused': {
          fontSize: '1.6rem',
        },
      },
    },
  },
});
