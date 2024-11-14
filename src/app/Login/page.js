'use client';
import React, { useState } from 'react';
import axios from 'axios';
import EmailInput from './email-input';
import PasswordInput from './password-input';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (emailValue, hasError) => {
    setEmail(emailValue);
    setEmailError(hasError);
  };

  const handlePasswordChange = (passwordValue) => {
    setPassword(passwordValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passwordError) return;
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/login`, {
      email, password
    });
    localStorage.setItem('loginToken', JSON.stringify({token:response.data.token}));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-sm p-10 bg-white rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Login</h2>

        <div className="mb-6">
          <EmailInput
            onEmailChange={handleEmailChange}
            className="w-full p-2 text-md rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-10">
          <PasswordInput
            onPasswordChange={handlePasswordChange}
            className="w-full p-2 text-md rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button
          type="submit"
          disabled={emailError || passwordError}
          className="w-full py-3 text-lg font-semibold bg-purple-500 text-white rounded-full shadow-lg transform transition-transform hover:bg-purple-600 active:scale-95 disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
