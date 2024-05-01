import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoginInput } from './types/LoginInput';
import { Login as LoginRequest } from '../../api/Login';

function Login() {
  const [loginMessage, setLoginMessage] = useState('');
  const [token, setToken] = useState(null);
  const { isError, error, isSuccess, data, mutate } = useMutation({
    mutationFn: LoginRequest,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = ({ email, password }) => {
    mutate({ email, password });
  };

  useEffect(() => {
    if (data?.statusCode === 401) {
      setLoginMessage('Invalid user credentials');
      return;
    } else {
      setToken(data?.access_token || null);
      setLoginMessage('');
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('jwtToken', JSON.stringify(token));
  }, [token]);

  return (
    <>
      {isError ? <span>Login failed: </span> : null}
      {isSuccess && loginMessage === '' ? <span>Login successful</span> : null}
      {isSuccess && loginMessage !== '' ? <span>{loginMessage}</span> : null}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            autoComplete="email"
            {...register('email')}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            autoComplete="current-password"
            {...register('password')}
          />
        </label>
        <input type="submit" value="Login" className="btn btn-neutral" />
      </form>
    </>
  );
}

export default Login;
