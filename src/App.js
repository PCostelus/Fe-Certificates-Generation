import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Adeverinte from './pages/Adeverinte';

import { Notifications } from './pages/Notifications';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
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

          <Route path='/notificari' element={<Notifications />} />
          <Route path='/adeverinte' element={<Adeverinte />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
