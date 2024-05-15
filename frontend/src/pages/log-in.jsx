import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'; 
import LoginForm from '../components/log-in-form'; 
import MainLayout from '../layouts/main-layout'

const Login = () => { 
	const { state } = useLocation(); 
	const redirectUrl = state?.redirectUrl || null; 

	useEffect(() => { 
		document.title = "Login"; 
	}, []); 

	return ( 
		<> 
			<MainLayout> 
				<LoginForm redirectUrl={redirectUrl} /> 
			</MainLayout> 
		</> 
	) 
} 

export default Login
