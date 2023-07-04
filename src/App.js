import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';

import { Notifications } from './pages/Notifications';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import Certificate from './pages/Certificate';
import { useEffect, useState } from 'react';

import jwt_decode from 'jwt-decode';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem('accessToken');

    if (authToken) {
      const decodeToken = jwt_decode(authToken);
      if (decodeToken.role === 0) {
        setIsAdmin(true);
      }
      setAuthenticated(true);
      setRole(decodeToken.role);
    } else {
      setAuthenticated(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            isAuthenticated ? (
              <Navigate replace to='/dashboard' />
            ) : (
              <Login
                setAuthenticated={setAuthenticated}
                setIsAdmin={setIsAdmin}
                setRole={setRole}
              />
            )
          }
        />
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <AppLayout
                setAuthenticated={setAuthenticated}
                isAdmin={isAdmin}
                role={role}
              />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )
          }
        >
          <Route
            path='/dashboard'
            element={
              isAuthenticated ? <Dashboard /> : <Navigate replace to='/login' />
            }
          />
          <Route
            path='/dashboard/facultati'
            element={<Dashboard activePage={'FACULTIES'} />}
          />
          <Route
            path='/dashboard/cadre-didactice'
            element={<Dashboard activePage={'PROFESSORS'} />}
          />
          <Route
            path='/dashboard/studenti'
            element={<Dashboard activePage={'STUDENTS'} />}
          />

          <Route
            path='/notificari'
            element={<Notifications isAdmin={isAdmin} />}
          />
          <Route
            path='/adeverinte'
            element={<Certificate isAdmin={isAdmin} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
