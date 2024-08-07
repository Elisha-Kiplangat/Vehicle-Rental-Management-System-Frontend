import { useState } from 'react';
import { useLoginUserMutation } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/user/UserSlice';
import { useDispatch } from 'react-redux';

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password }).unwrap();
      dispatch(setUser(data));
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id.toString());
      localStorage.setItem('role', data.role);

      if (data.role === 'user') {
        navigate('/dashboard/user');
      } else {
        navigate('/dashboard/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="form-container sign-in absolute top-0 h-full transition-all ease-in-out duration-600 left-0 w-1/2 z-10">
      <form className="bg-white flex flex-col items-center justify-center py-0 px-10 h-full" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="text-sm no-underline my-4" href="#">Forget Your Password?</a>
        <button
          className="bg-purple-700 text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-4 cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>
        {isError && <p className="error text-red-500 mt-2">Failed to sign in</p>}
        {isSuccess && <p className="success text-green-500 mt-2">Signed in successfully</p>}
      </form>
    </div>
  );
};
