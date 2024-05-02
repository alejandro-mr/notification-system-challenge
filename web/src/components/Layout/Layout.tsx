import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col">
      <h1 className="text-center">Notification System</h1>
      <ul className="menu bg-base-300">
        <li>
          <a href="/">Create Notification</a>
        </li>
        <li>
          <a href="/notifications">Notifications</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Layout;
