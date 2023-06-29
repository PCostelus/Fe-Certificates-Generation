import styledComponents from 'styled-components';

export const Container = styledComponents.div`
    margin-right: 50px
`;

export const SettingsTitle = styledComponents.h2`
    margin-bottom: 50px;
    font-size: 30px
`;

export const NavBar = styledComponents.div`
    display: flex
`;

export const Banner = styledComponents.div`
    border: 1px solid gray;
    padding: 10px;
    width: max-content;
    font-weight: 600;
    font-family: sans-serif;
    cursor: pointer;
    border-radius: ${(props) =>
      props.radius === 'left'
        ? '10px 0 0 10px'
        : props.radius === 'right'
        ? '0 10px 10px 0'
        : null};
    background: ${(props) => (props.isActive === true ? '#213555' : '')};
    color: ${(props) => (props.isActive === true ? 'white' : 'black')} 
`;

export const BannerButton = styledComponents.button`
    padding: 10px;
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
