import React, { useState } from 'react';
import FormInput from '../components/FormInput';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Simple validation example
    if (!formData.email || !formData.password) {
      setError('Please fill in both fields.');
      return;
    }

    // Here you will later add your API call to authenticate the user
    console.log('Submitting', formData);

    // For now, just reset form (or redirect)
    setFormData({ email: '', password: '' });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Archivio</h2>

        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
