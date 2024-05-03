import { useQuery } from '@tanstack/react-query';
import { getNotificationsLog } from '../../api/Notifications';

function Notifications() {
  const {
    isLoading,
    isError,
    error,
    data: log,
  } = useQuery({
    queryKey: ['log'],
    queryFn: getNotificationsLog,
  });

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (isError) {
    return <span>Error while loading notifications log. {error.message}</span>;
  }

  return (
    <>
      <h3>Notifications log</h3>
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          If a records are missing on the notification log try refreshing the
          page (No real time updates implemented), it may take a couple of
          seconds for the pubsub queue to be processed completely.
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-sm table-pin-rows table-pin-cols border-spacing-2">
          <thead>
            <tr className="bg-base-200">
              <th>User</th>
              <th>Channel</th>
              <th>Category</th>
              <th>Message</th>
              <th>Sent</th>
            </tr>
          </thead>
          <tbody>
            {log.map(({ id, user, notification, channel, sentAt }) => (
              <tr className="bg-base-200 hover" key={id}>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-primary">{channel}</span>
                </td>
                <td>
                  <span className="badge badge-secondary">
                    {notification.category.category}
                  </span>
                </td>
                <td>{notification.message}</td>
                <td>{new Date(sentAt).toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Notifications;
