
import { useState } from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

const SignInUp = () => {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = () => {
    setActiveForm('signin');
  };

  const handleSignUp = () => {
    setActiveForm('signup');
  };

  return (

    <div className="container bg-white rounded-lg shadow-lg relative overflow-hidden w-full max-w-2xl min-h-[450px] flex" id="container">
      
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        {activeForm === 'signin' && <SignIn />}
        {activeForm === 'signup' && <SignUp />}
      </div>
      

      
      <div className="toggle-container w-1/2 h-full transition-all ease-in-out duration-600 flex flex-col justify-center items-center bg-purple-700 text-white">
        <div className="toggle h-full w-full transition-all ease-in-out duration-600" style={{ transform: activeForm === 'signin' ? 'translateX(-100%)' : 'translateX(0%)' }}>

         
          <div className={`toggle-panel w-full h-full flex items-center justify-center flex-col py-0 px-7 text-center text-white transition-all ease-in-out duration-600 ${activeForm === 'signup' ? 'translate-x-0 bg-purple-700' : 'translate-x-full opacity-0'}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="bg-transparent border-white border py-2 px-10 rounded-lg mt-4" id="login" onClick={handleSignIn}>Sign In</button>
  
          </div>

          <div className={`toggle-panel h-full flex items-center justify-center flex-col py-0 px-7 text-center text-white transition-all ease-in-out duration-600 ${activeForm === 'signup' ? 'translate-x-0 opacity-0' : 'translate-x-full'}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="bg-transparent border-white border py-2 px-10 rounded-lg mt-4" id="register" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
