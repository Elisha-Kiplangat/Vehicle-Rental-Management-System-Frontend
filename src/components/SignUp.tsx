
import { useState } from 'react';
import { useRegisterUserMutation } from '../features/auth/AuthSlice';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterUserMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await registerUser({ name, email, phone, address, password });
  };

  return (
    <div className="form-container sign-up absolute top-0 h-full transition-all ease-in-out duration-600 left-0 w-1/2 z-0">
      <form className="bg-white flex flex-col items-center justify-center py-0 px-10 h-full" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
         <input className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none" type="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none" type="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input className="bg-gray-200 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-purple-700 text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-4 cursor-pointer" type="submit" disabled={isLoading}>Sign Up</button>
        {isError && <p className="error text-red-500 mt-2">Failed to sign up</p>}
        {isSuccess && <p className="success text-green-500 mt-2">Signed up successfully</p>}
      </form>
    </div>
  );
};
