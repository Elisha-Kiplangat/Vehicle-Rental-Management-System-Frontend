import { useState, type FormEvent } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const SUPPORT_EMAIL = 'info@rentvy.com';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent('Password reset request');
    const body = encodeURIComponent(
      `Please help me reset the password for this account:\n\n${email}`,
    );

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <div className="min-h-[70vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-blue-100 overflow-hidden">
          <div className="p-8 md:p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <p className="text-sm uppercase tracking-[0.3em] opacity-80">Account Recovery</p>
            <h1 className="mt-2 text-3xl font-bold">Reset your password</h1>
            <p className="mt-3 text-blue-100">
              We&apos;ll open a prefilled email so support can help you regain access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Enter the email used on your account"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Send reset request
            </button>

            {submitted && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                Your email app should open with a reset request addressed to {SUPPORT_EMAIL}.
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;