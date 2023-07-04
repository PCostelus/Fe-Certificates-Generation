import {
  faCalendar,
  faFileCircleXmark,
  faFileCircleCheck,
  faFileCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { MONTHS } from '../../utils/constants';
import jwt_decode from 'jwt-decode';
import {
  Button,
  CardBottomSection,
  CardButtons,
  CardComp,
  CardContainer,
  CardLabelSection,
  CardStudyYear,
  CardTextField,
  CardTitle,
  DisplayInfoToEnd,
  HrLine,
  InLineInfo,
  RegistryDate,
} from './NotificationsCardStyle';

const signsIconsArr = [
  faFileCircleCheck,
  faFileCircleExclamation,
  faFileCircleXmark,
];

const serverHost = process.env.REACT_APP_SERVER_HOST;

const signsIconsColorArr = ['#297b1e', '#9d8c20', '#ab2b2b'];

export const NotificationsCard = (props) => {
  const { certificate, isAdmin } = props;

  const token = localStorage.getItem('accessToken');
  let decodeToken;
  if (token) {
    decodeToken = jwt_decode(token);
    console.log(decodeToken);
  }

  const month = MONTHS[certificate?.registration_date?.split('.')[0]];
  const day = certificate?.registration_date?.split('.')[1];
  const year = certificate?.registration_date?.split('.')[2];
  const studyYearArr = [false, false, false, false];
  studyYearArr[certificate.study_year - 1] = true;

  const decanSignatures =
    certificate.decan_signature === null
      ? 1
      : certificate.decan_signature === false
      ? 2
      : 0;

  const headSecretarySignatures =
    certificate.head_secretary_signature === null
      ? 1
      : certificate.head_secretary_signature === false
      ? 2
      : 0;

  const secretarySignatures =
    certificate.secretary_signature === null
      ? 1
      : certificate.secretary_signature === false
      ? 2
      : 0;

  const handleSign = async () => {
    try {
      await axios.post(`${serverHost}/certificate/sign/${certificate.id}`, {
        signer: decodeToken.userId,
        signing: true,
      });
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`${serverHost}/certificate/sign/${certificate.id}`, {
        signer: decodeToken.userId,
        signing: false,
      });
      reload();
    } catch (err) {
      console.log(err);
    }
  };
  const reload = () => window.location.reload();

  return (
    <CardContainer>
      <CardTitle>
        {certificate?.user?.last_name} {certificate?.user?.father_initial}.{' '}
        {certificate?.user?.first_name}
      </CardTitle>
      <InLineInfo>
        <CardLabelSection>Nr. inregistrare</CardLabelSection>
        <DisplayInfoToEnd>{certificate.registration_number}</DisplayInfoToEnd>
      </InLineInfo>
      <InLineInfo>
        <CardLabelSection>Data inregistrarii</CardLabelSection>
        <RegistryDate>
          <FontAwesomeIcon
            icon={faCalendar}
            size='x'
            color='gray'
            style={{
              marginRight: '5px',
            }}
          />
          {day} {month} {year}
        </RegistryDate>
      </InLineInfo>
      <CardLabelSection style={{ marginTop: '10px' }}>
        An de studiu
      </CardLabelSection>
      <CardComp>
        <CardStudyYear isSelected={studyYearArr[0]}>1</CardStudyYear>
        <CardStudyYear isSelected={studyYearArr[1]}>2</CardStudyYear>
        <CardStudyYear isSelected={studyYearArr[2]}>3</CardStudyYear>
        <CardStudyYear isSelected={studyYearArr[3]}>4</CardStudyYear>
      </CardComp>
      <CardTextField>
        <TextField
          label='Programul de studii'
          select
          disabled
          variant='outlined'
          size='small'
          style={{ width: '100%' }}
          value={certificate.study_program}
        >
          <MenuItem key={'calc'} value={certificate.study_program}>
            {certificate.study_program}
          </MenuItem>
        </TextField>
      </CardTextField>
      <CardTextField>
        <TextField
          label='Motivul'
          multiline
          minRows={2}
          maxRows={2}
          disabled
          variant='outlined'
          size='small'
          style={{ width: '100%' }}
          value={certificate.reason}
        />
      </CardTextField>

      <HrLine style={{ marginTop: '20px' }} />
      <InLineInfo>
        <CardLabelSection>Semnatura Decan</CardLabelSection>
        <DisplayInfoToEnd>
          <FontAwesomeIcon
            icon={signsIconsArr[decanSignatures]}
            size='xl'
            color={signsIconsColorArr[decanSignatures]}
          />
        </DisplayInfoToEnd>
      </InLineInfo>
      <InLineInfo>
        <CardLabelSection>Semnatura secretara-sef</CardLabelSection>
        <DisplayInfoToEnd>
          <FontAwesomeIcon
            icon={signsIconsArr[headSecretarySignatures]}
            size='xl'
            color={signsIconsColorArr[headSecretarySignatures]}
          />
        </DisplayInfoToEnd>
      </InLineInfo>
      <InLineInfo>
        <CardLabelSection>Semnatura secretara</CardLabelSection>
        <DisplayInfoToEnd>
          <FontAwesomeIcon
            icon={signsIconsArr[secretarySignatures]}
            size='xl'
            color={signsIconsColorArr[secretarySignatures]}
          />
        </DisplayInfoToEnd>
      </InLineInfo>
      <HrLine />
      {isAdmin === false && (
        <CardBottomSection>
          <CardButtons>
            <Button onClick={handleReject} style={{ marginRight: '7px' }}>
              Respinge
            </Button>
            <Button
              onClick={handleSign}
              style={{
                marginLeft: '7px',
                width: '110px',
                background: '#4F709C',
                color: 'white',
                borderColor: '#4F709C',
              }}
            >
              Semneaza
            </Button>
          </CardButtons>
        </CardBottomSection>
      )}
    </CardContainer>
  );
};
