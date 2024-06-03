import React from 'react';
// Import the file
import SignupForm from "./SignupForm"

const Signup: React.FC = () => {
  // And use it after the h2 tag
  return (
    <div className="h-screen w-full">
      <div className=" flex justify-center align-center">
        <SignupForm />
      </div>
    </div>
  );
}
export default Signup;