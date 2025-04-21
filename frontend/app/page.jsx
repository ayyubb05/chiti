"use client";  // This makes it a client-side component
import { useState } from 'react';
import Button from '@/components/ui/Button';
import RegistrationForm from '@/components/forms/RegistrationForm';
import LoginForm from '@/components/forms/LoginForm';


export default function Home() {
  const [launchViewVisibility, setLaunchViewVisibility] = useState(true);
  const [registrationVisibility, setRegistrationVisibility] = useState(false);
  const [loginVisibility, setLoginVisibility] = useState(false);

  const handleRegister = () => {
    setLaunchViewVisibility(false);
    setLoginVisibility(false);
    setRegistrationVisibility(true);
  }

  const handleLogin = () => {
    setLaunchViewVisibility(false);
    setRegistrationVisibility(false);
    setLoginVisibility(true);
  }

  const handleBack = () => {
    setRegistrationVisibility(false);
    setLoginVisibility(false);
    setLaunchViewVisibility(true);
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/chiti-logo.svg"
            alt="Chiti Logo"
            className={`${launchViewVisibility ? "w-64" : "w-32"}`}
          />
          <h1 className={`text-title-text  ${launchViewVisibility ? "-mt-10 text-[80px]" : "-mt-2 "}`}>CHITI</h1>
        </div>

        {launchViewVisibility && (
          <div className="flex gap-5 md:flex-row flex-col">
            <Button text="Sign Up" onClick={handleRegister} modifier="w-48"/>
            <Button text="Log In" onClick={handleLogin} modifier="w-48" />
          </div>
        )}

        {loginVisibility && <LoginForm />}
        {registrationVisibility && <RegistrationForm onRegisterSuccess={handleLogin}/>}

        {!launchViewVisibility && (
          <Button text="Back" onClick={handleBack} modifier="w-48"/>
        )}
      </div>
    </div>
  );
}
