import { useState } from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';

interface SignInUpProps {
  onClose: () => void;
}

const switchPanel = [
  {
    heading: 'Hello, Friend!',
    text: 'Register with your personal details to use all site features',
    btnTxt: 'Sign In'
  },
  {
    heading: 'Welcome Back!',
    text: 'Enter your personal details to use all site features',
    btnTxt: 'Sign Up'
  }
];

const SignInUp = ({ onClose }: SignInUpProps) => {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signin'); // Changed default to 'signin'

  const handleSignIn = () => {
    setActiveForm('signin');
    setActiveForm('signin');
  };

  const handleSignUp = () => {
    setActiveForm('signup');
  };

  const handleClose = () => {
    setActiveForm('signin');
    onClose();
  };

  const activePanel = activeForm === 'signin' ? switchPanel[1] : switchPanel[0];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="container bg-white rounded-lg shadow-lg relative overflow-hidden w-full md:w-3/4 lg:w-1/2 max-w-2xl min-h-[450px] flex items-center" id="container">
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          {activeForm === 'signin' && <SignIn />}
          {activeForm === 'signup' && <SignUp />}
        </div>

        <div className="toggle-container bg-blue-100 w-1/2 min-h-[450px] rounded-l-2xl flex flex-col items-center justify-center pt-12">
          <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className={`toggle-panel p-4 flex flex-col items-center justify-center ${activeForm === 'signup' ? 'opacity-100' : 'opacity-100'}`}>
            <h1 className='text-blue-700'>{activePanel.heading}</h1>
            <p className='py-4 flex text-center'>{activePanel.text}</p>
            <button className="bg-transparent border-white border py-2 px-10 rounded-lg mt-4" onClick={activeForm === 'signup' ? handleSignIn : handleSignUp}>
              {activePanel.btnTxt}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
