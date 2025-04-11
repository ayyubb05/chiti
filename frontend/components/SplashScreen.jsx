"use client";  // This makes it a client-side component

import { useState } from 'react';
import Button from '@/components/ui/Button';
import RegistrationForm from '@/components/forms/RegistrationForm';
import LoginForm from '@/components/forms/LoginForm';


const SplashScreen = () => {
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
			<div className="flex flex-col items-center gap-5">
				<img
					src="/chiti-logo.svg"
					alt="Chiti Logo"
					className={`h-auto mb-10 ${launchViewVisibility ? "w-64" : "w-32"}`}
				/>

				{launchViewVisibility && (
					<div className="flex gap-5 md:flex-row flex-col">
						<Button text="Sign Up" onClick={handleRegister} />
						<Button text="Log In" onClick={handleLogin} />
					</div>
				)}

				{loginVisibility && <LoginForm />}
				{registrationVisibility && <RegistrationForm onRegisterSuccess={handleLogin}/>}

				{!launchViewVisibility && (
					<Button text="Back" onClick={handleBack} />
				)}
			</div>
		</div>
	);
};

export default SplashScreen;