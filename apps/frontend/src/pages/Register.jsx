import React from 'react'
import FormInput from '../components/FormInput'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
        <form>
          <FormInput label="Name" type="text" name="name" placeholder="Your full name" />
          <FormInput label="Email" type="email" name="email" placeholder="you@example.com" />
          <FormInput label="Password" type="password" name="password" placeholder="••••••••" />
          <FormInput label="Confirm Password" type="password" name="confirmPassword" placeholder="••••••••" />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
