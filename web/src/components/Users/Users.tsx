import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/Users';

function Users() {
  const {
    isLoading,
    isError,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h3>Available Users</h3>
      <div className="overflow-x-auto">
        <table className="table table-sm table-pin-rows table-pin-cols border-spacing-2">
          <thead>
            <tr className="bg-base-200">
              <th>Email</th>
              <th>Password</th>
              <th>Subscriptions</th>
              <th>Channels</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, email, password, subscriptions, channels }) => (
              <tr className="bg-base-200 hover" key={id}>
                <td>{email}</td>
                <td>{password}</td>
                <td>
                  <div className="flex gap-2">
                    {subscriptions.map((subscription) => (
                      <span
                        className="badge badge-neutral"
                        key={subscription.id}
                      >
                        {subscription.category.category}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    {channels.map((channel) => (
                      <span className="badge" key={`${id}_${channel}`}>
                        {channel}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
