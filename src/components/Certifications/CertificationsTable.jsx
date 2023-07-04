import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StatusCircle } from './CertificationsStyles';
import { STATUS_TEXT_MAPPER } from '../../utils/mappers';
import { MONTHS } from '../../utils/constants';

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

export const CertificationsTable = (props) => {
  const { certifications } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Student</StyledTableCell>
            <StyledTableCell align='right'>Nr. Inregistrare</StyledTableCell>
            <StyledTableCell align='right'>Status</StyledTableCell>
            <StyledTableCell align='right'>Data inregistrarii</StyledTableCell>
            <StyledTableCell align='right'>Programul de studii</StyledTableCell>
            <StyledTableCell align='right'>Anul de studiu</StyledTableCell>
            <StyledTableCell align='right'>Motivul</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certifications.length &&
            certifications?.map((row, index) => {
              const month = MONTHS[row?.registration_date?.split('.')[0]];
              const day = row?.registration_date?.split('.')[1];
              const year = row?.registration_date?.split('.')[2];
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component='th' scope='row'>
                    {row?.user?.last_name} {row?.user?.father_initial}.
                    {row?.user?.first_name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.registration_number}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <StatusCircle status={row.status}>
                      {STATUS_TEXT_MAPPER[row.status]}
                    </StatusCircle>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {day} {month} {year}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.study_program}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.study_year}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.reason}</StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
