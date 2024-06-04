import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Button } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SigninForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(import.meta.env.VITE_API_ENDPOINT , "this is the env")
      const data = {
        email: email,
        password: password,
      }
      console.log(JSON.stringify(data),"data");
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log(response , "response")
      const responseData = await response.json();
      localStorage.setItem('token', responseData.auth_token);
      if (!response.ok) {
          if(response.status === 422){
            toast.info("user already registered please login in")
          }
          else{
            throw new Error('Sign-up failed');
          }
      }
      console.log('Sign-up successful');
      navigate('/dashboard')
      toast.success("signed in successful");
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  min-w-[500px] mt-10">
        <div className="w-full bg-white bg-gray-200/50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
             <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-gray-900 border-2"
              >
                Sign In
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                have an account ?{' '}
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SigninForm;