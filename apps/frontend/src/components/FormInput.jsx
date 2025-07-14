import React from 'react';

export default function FormInput({ label, type = 'text', value, onChange, name, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
