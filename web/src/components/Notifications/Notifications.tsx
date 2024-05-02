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
