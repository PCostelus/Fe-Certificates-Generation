import { TextField } from '@mui/material';
import styledComponents from 'styled-components';

export const Container = styledComponents.div`
    margin-right: 50px
`;

export const ProfessorsContainer = styledComponents.div`
    margin-top: 40px
`;

export const CardContainer = styledComponents.div`
    height: 90px;
    background: #97c7a4;
    width: 100%;
    border: 2px solid #213555;
    border-radius: 10px;
    margin-top: 30px;
    padding: 5px
`;

export const FacultyTitle = styledComponents.h3`
    margin: 10px
`;

export const BottomDetails = styledComponents.div`
    display: flex
`;

export const Details = styledComponents.p`
    color: #213555;
    margin: 10px;
    font-size: 15px;
    font-family: sans-serif;
`;

export const FacultyActionButton = styledComponents.button`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 40px;
    border: none;
    outline: none;
    color: white;
    background: #213555;
    cursor: pointer;
    z-index: 0;
    border-radius: 7px;
    font-size: 16px;
`;

export const ModalTitle = styledComponents.h2`
    margin: 20px 0 10px 20px 
`;

export const Hr = styledComponents.hr`
    width: 90%;
    margin: auto
`;

export const CustomTextField = styledComponents(TextField)`
    width: 100%;
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #4F709C;
    }
`;

export const InputComponents = styledComponents.div`
    width: 90%;
    margin: auto
`;

export const DisplayInline = styledComponents.div`
    display: flex;
    margin-bottom: 15px;
`;

export const AddProfessorsButton = styledComponents.button`
    padding:10px;
    border: none;
    outline: none;
    color: white;
    background: #213555;
    cursor: pointer;
    z-index: 0;
    border-radius: 10px;
    font-size: 16px;
    margin-left: auto;
    font-weight: bold;
`;

export const ProfessorsNavBar = styledComponents.div`
    display: flex;
    margin-bottom: 15px;
`;

export const DeleteModalTitle = styledComponents.h3`
    margin: 30px
`;

export const UploadStudentsModalTitle = styledComponents.h2`
    margin: 30px
`;

export const DeleteModalBottom = styledComponents.div`
    height: 80px;
    background: #f7f5f5;
    border-radius: 0 0 10px 10px;
`;

export const DeleteModalBody = styledComponents.div`
    margin: 30px;
    color: gray;
`;

export const Uploader = styledComponents.div`
    margin: 50px
`;
