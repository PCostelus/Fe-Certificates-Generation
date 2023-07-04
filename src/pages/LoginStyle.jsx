import { TextField } from '@mui/material';
import styledComponents from 'styled-components';

export const LoginPageContainer = styledComponents.div`
    width: 100%;
    height: 100vh;
    background: #EFF3F7;
    justify-content: center;
    display: flex;
    align-items: center;
`;

export const LoginContainer = styledComponents.div`
    margin:auto;
`;

export const LoginCard = styledComponents.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 400px;
    width: 500px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border-radius: 20px;
    color: 213555
  
`;

export const LoginLogo = styledComponents.img`
    height: 60px;
    margin-bottom: 40px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
`;

export const CardTitle = styledComponents.h2`
    text-align: center;
    margin-top: 30px;
    font-weight: 500;
    font-size: 30px;
`;

export const CardSubTitle = styledComponents.p`
    text-align: center;
    margin-top: 10px;
    font-weight: 400;
    margin-bottom: 30px;
    font-size: 16px;
    color: gray;
`;

export const CustomTextField = styledComponents(TextField)`
    width: 100%;
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #213555;
    }
`;

export const LoginButton = styledComponents.button`
    padding: 15px;
    margin-top: 30px;
    width: 70%;
    border: none;
    outline: none;
    color: white;
    background: #4F709C;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    float: right;
    font-size: 18px;
`;
