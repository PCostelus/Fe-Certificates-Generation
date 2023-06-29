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
          {props.certifications.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                {row.student}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.nr_inregistrare}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <StatusCircle status={row.status}>
                  {STATUS_TEXT_MAPPER[row.status]}
                </StatusCircle>
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.data_inregistarii}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.program_studii}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.an_studiu}</StyledTableCell>
              <StyledTableCell align='right'>{row.motiv}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
