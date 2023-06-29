import {
  faCalendar,
  faFileCircleXmark,
  faFileCircleCheck,
  faFileCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
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

const signsIconsColorArr = ['#297b1e', '#9d8c20', '#ab2b2b'];

export const NotificationsCard = (props) => {
  return (
    <CardContainer>
      <CardTitle>Pamparau Costelus Emanuel</CardTitle>
      <InLineInfo>
        <CardLabelSection>Nr. inregistrare</CardLabelSection>
        <DisplayInfoToEnd>ghd45</DisplayInfoToEnd>
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
          29 Martie 2023
        </RegistryDate>
      </InLineInfo>
      <CardLabelSection style={{ marginTop: '10px' }}>
        An de studiu
      </CardLabelSection>
      <CardComp>
        <CardStudyYear>1</CardStudyYear>
        <CardStudyYear>2</CardStudyYear>
        <CardStudyYear isSelected={true}>3</CardStudyYear>
        <CardStudyYear>4</CardStudyYear>
      </CardComp>
      <CardTextField>
        <TextField
          label='Domeniul'
          select
          disabled
          variant='outlined'
          size='small'
          style={{ width: '100%' }}
          value={'Calculatoare'}
        >
          <MenuItem key={'calc'} value={'Calculatoare'}>
            Calculatoare
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
          value={'Eliberarea bursei pentru a servi la munca'}
        />
      </CardTextField>

      <HrLine style={{ marginTop: '20px' }} />
      <InLineInfo>
        <CardLabelSection>Semnatura Decan</CardLabelSection>
        <DisplayInfoToEnd>
          <FontAwesomeIcon
            icon={signsIconsArr[1]}
            size='xl'
            color={signsIconsColorArr[1]}
          />
        </DisplayInfoToEnd>
      </InLineInfo>
      <InLineInfo>
        <CardLabelSection>Semnatura secretara-sef</CardLabelSection>
        <DisplayInfoToEnd>
          <FontAwesomeIcon
            icon={signsIconsArr[0]}
            size='xl'
            color={signsIconsColorArr[0]}
          />
        </DisplayInfoToEnd>
      </InLineInfo>
      <InLineInfo>
        <CardLabelSection>Semnatura secretara</CardLabelSection>
        <DisplayInfoToEnd>
          <FontAwesomeIcon
            icon={signsIconsArr[1]}
            size='xl'
            color={signsIconsColorArr[1]}
          />
        </DisplayInfoToEnd>
      </InLineInfo>
      <HrLine />
      <CardBottomSection>
        <CardButtons>
          <Button style={{ marginRight: '7px' }}>Respinge</Button>
          <Button
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
    </CardContainer>
  );
};
