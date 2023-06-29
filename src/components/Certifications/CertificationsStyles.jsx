import styledComponents from 'styled-components';
import { TextField } from '@mui/material';
import { STATUS_COLLOR_MAPPER } from '../../utils/mappers';

export const AddObjectH2 = styledComponents.div`
    text-transform: uppercase;
    margin: 15px 0 15px;
    font-weight: 800;
    font-size: 25px;
    color: 213555;
`;

export const CustomTextField = styledComponents(TextField)`
    width: 100%;
    margin-bottom: 50px;
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #4F709C;
    }
`;

export const HrModal = styledComponents.hr`
    width: 100%;
    margin: auto
`;

export const Button = styledComponents.button`
    width: 100px;
    height: 40px;
    border: none;
    outline: none;
    color: white;
    background: #213555;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    float: right;
    font-size: 16px;
`;

export const BottomButtons = styledComponents.div`
    margin-top: 15px;
    display: flex;
    justify-content: end;
`;

export const StatusCircle = styledComponents.div`
    width: 80%;
    border-radius: 50px;
    background-color:${(props) => STATUS_COLLOR_MAPPER[props.status]};
    float:right;

`;
