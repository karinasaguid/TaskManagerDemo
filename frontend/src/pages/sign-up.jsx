import React, { useEffect } from 'react'
import SignupForm from '../components/sign-up-form'; 
import MainLayout from '../layouts/main-layout'

const Signup = () => { 

	useEffect(() => { 
		document.title = "Signup"; 
	}, []); 
	return ( 
		<> 
			<MainLayout> 
				<SignupForm /> 
			</MainLayout> 
		</> 
	) 
} 

export default Signup
