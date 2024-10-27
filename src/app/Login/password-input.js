import React, { useState } from 'react';

const PasswordInput = ({ onPasswordChange }) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    onPasswordChange(value);

    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="w-full mb-4">
      <label className="block mb-2 text-gray-600 font-semibold">Password</label>
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        className={`w-full p-2 rounded-full border ${passwordError ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
        required
      />
      {passwordError && <small className="text-red-500 mt-2 text-xs">{passwordError}</small>}

      <div className="mt-3 flex items-center">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="mr-2"
        />
        <span className="text-sm text-gray-600">Show Password</span>
      </div>
    </div>
  );
};

export default PasswordInput;
