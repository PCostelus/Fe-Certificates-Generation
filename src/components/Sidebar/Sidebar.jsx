import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import logo from '../../images/usv-logo.png';
import jwt_decode from 'jwt-decode';
import { ROLES_MAPPER } from '../../utils/mappers';

const Sidebar = (props) => {
  const sidebarNavItems = (role) => {
    if (role === 0) {
      return [
        {
          display: 'Dashboard',
          icon: <i className='bx bx-home'></i>,
          to: '/dashboard',
          section: 'dashboard',
        },
        {
          display: 'Notificari',
          icon: <i className='bx bx-notification'></i>,
          to: '/notificari',
          section: 'notificari',
        },

        {
          display: 'Adeverinte',
          icon: <i className='bx bx-receipt'></i>,
          to: '/adeverinte',
          section: 'adeverinte',
        },
      ];
    } else if (role === 4) {
      return [
        {
          display: 'Adeverintele mele',
          icon: <i className='bx bx-receipt'></i>,
          to: '/adeverinte',
          section: 'adeverinte',
        },
      ];
    } else {
      return [
        {
          display: 'Notificari',
          icon: <i className='bx bx-notification'></i>,
          to: '/notificari',
          section: 'notificari',
        },
      ];
    }
  };
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  let decodeToken;
  if (token) {
    decodeToken = jwt_decode(token);
  }

  const logout = () => {
    localStorage.clear();
    props.setAuthenticated(false);

    navigate('/login');
    window.location.reload();
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        '.sidebar__menu__item'
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems(props.role).findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>
        <img style={{ height: '50px' }} src={logo} alt='Logo' />
      </div>
      <div ref={sidebarRef} className='sidebar__menu'>
        <div
          ref={indicatorRef}
          className='sidebar__menu__indicator'
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems(props.role).map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? 'active' : ''
              }`}
            >
              <div className='sidebar__menu__item__icon'>{item.icon}</div>
              <div className='sidebar__menu__item__text'>{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className='sidebar__bottom'>
        <div className='sidebar__bottom__avatar'>
          <p className='sidebar__bottom__avatar__p'>CA</p>
        </div>
        <div>
          <div onClick={logout} className='sidebar__bottom__role_1'>
            {decodeToken && ROLES_MAPPER[decodeToken?.role]}
          </div>
          <div className='sidebar__bottom__role_2'>
            {decodeToken && decodeToken.email_address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
