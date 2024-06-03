import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@headlessui/react'
const SignupForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://wd301-api.pupilfirst.school/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: userName , email: userEmail , password: userPassword}),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }
      console.log('Sign-up successful');
      toast.success("signed in successful");
     
    } catch (error) {
      console.error('Sign-up failed:', error);
      toast.error("error while signing in");
    }
  };
return (
    <div className="w-full h-screen">
      <div className="flex flex-col">
        <div className="min-w-[400px] min-h-[600px] border-2 border-white rounded-xl">
          <div className="flex flex-col">
            <label>User Name</label>
            <input type="text" name="userName" onChange={(e)=>{setUserName(e.target.value)}}/>
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input type="text" name="userName" onChange={(e)=>{setUserEmail(e.target.value)}}/>
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input type="text" name="userName" onChange={(e)=>{setUserPassword(e.target.value)}}/>
          </div>
          <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
             Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;