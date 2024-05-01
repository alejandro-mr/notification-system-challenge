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
      {users.map((user) => (
        <div key={user.id}>{user.email} : {user.password}</div>
      ))}
    </div>
  );
}

export default Users;
