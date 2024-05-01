import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col gap-3">
      <h1>Notification System</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
