import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const AppLayout = (props) => {
  return (
    <div
      style={{
        padding: '50px 0px 0px 370px',
      }}
    >
      <Sidebar
        setAuthenticated={props.setAuthenticated}
        isAdmin={props.isAdmin}
        role={props.role}
      />
      <Outlet />
    </div>
  );
};

export default AppLayout;
