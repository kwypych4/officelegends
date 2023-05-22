import { Outlet } from 'react-router-dom';

export const LoggedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
