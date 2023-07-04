import axios from 'axios';
import { useEffect, useState } from 'react';
import { NotificationsCard } from '../components/Notifications/NotificationCard';
import { DisplayCards, NotificationTitle } from './NotificationStyle';

const serverHost = process.env.REACT_APP_SERVER_HOST;

export const Notifications = (props) => {
  const [certificates, setCertificates] = useState([]);

  const getCertificates = async () => {
    try {
      const certificates = await axios.get(
        `${serverHost}/certificate/notifications`,
        {}
      );
      certificates.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setCertificates(certificates.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);
  return (
    <div>
      <NotificationTitle>Notificari</NotificationTitle>
      <DisplayCards>
        {certificates.length &&
          certificates.map((certificate) => (
            <NotificationsCard
              isAdmin={props.isAdmin}
              certificate={certificate}
            />
          ))}
      </DisplayCards>
    </div>
  );
};
