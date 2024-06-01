import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  let navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const { name, email } = userData;

  return (
   <div>
    <h1>LandingPage</h1>
   </div>
  );
};

export default LandingPage;
