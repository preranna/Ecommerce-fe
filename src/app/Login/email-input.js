import React, { useState } from 'react';

const EmailInput = ({ onEmailChange }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    onEmailChange(value, !validateEmail(value));
  };

  return (
    <div className="w-full mb-4">
      <label className="block mb-2 text-gray-600 font-semibold">Email</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="user@example.com"
        className={`w-full p-2 rounded-full border ${emailError ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
        required
      />
      {emailError && <small className="text-red-500 mt-2 text-xs">{emailError}</small>}
    </div>
  );
};

export default EmailInput;
