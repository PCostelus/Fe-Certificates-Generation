import styledComponents from 'styled-components';

export const CardContainer = styledComponents.div`
    height: 550px;
    background: white;
    width: 400px;
    border-radius: 15px;
    margin: 30px;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export const CardTitle = styledComponents.h3`
    margin:  25px 30px 20px 30px;
`;

export const InLineInfo = styledComponents.div`
    display:flex;
    margin-right: 30px;
    margin-top: 10px;
`;

export const DisplayInfoToEnd = styledComponents.div`
    margin-left: auto;
    font-weight: bold;
    font-style: italic;
    color: gray
`;

export const CardLabelSection = styledComponents.p`
    margin-left: 30px;
`;

export const CardComp = styledComponents.div`
    display: flex;
    margin-left: 25px;
    margin-top: 5px;
`;

export const CardStudyYear = styledComponents.div`
    width: 50px;
    margin-top: 0px !important;
    border: 2px solid;
    border-color: ${(props) => (props.isSelected ? 'gray' : '#ebebeb')};
    color: ${(props) => (props.isSelected ? 'black' : 'gray')};
    border-radius: 7px;
    padding: 5px;
    align-content: center;
    margin: 5px;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    font-family: sans-serif;
    background: ${(props) => (props.isSelected ? '#f0f0f0' : '')};
`;

export const RegistryDate = styledComponents.div`
    text-align: left;
    font-weight: 500;
    font-size: 16px;
    font-family: sans-serif;
    margin-left: auto;
    color: gray;
`;

export const CardTextField = styledComponents.div`
    margin: 25px 30px 10px 30px;
`;

export const HrLine = styledComponents.hr`
    margin: 10px 30px 10px 30px;
    border-top: 1px solid #ebeced;
`;

export const Button = styledComponents.button`
    width: 100px;
    padding: 8px;
    border: none;
    outline: none;
    color: black;
    background: white;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border: 2px solid gray;
    border-radius: 20px;
    float: right;
    font-size: 16px;
    font-weight: bold;
    font-family: sans-serif;
`;

export const CardBottomSection = styledComponents.div`
    margin: 15px 30px 10px 30px;

`;

export const CardButtons = styledComponents.div`
    display: flex;
    justify-content: right;
`;
