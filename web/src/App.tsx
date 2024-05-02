import './App.css';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Notification from './components/Notification/Notification';
import Notifications from './components/Notifications/Notifications';
import Users from './components/Users/Users';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <Layout children={undefined} />,
    children: [
      {
        path: '/',
        element: <Notification />,
      },
      {
        path: '/notification',
        element: <Notification />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
