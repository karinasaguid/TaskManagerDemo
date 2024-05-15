import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import Tasks from '../components/tasks';
import MainLayout from '../layouts/main-layout'; 

const Home = () => { 

const authState = useSelector(state => 
	state.authReducer); 
const { isLoggedIn } = authState; 

useEffect(() => { 
	document.title = authState.isLoggedIn ? 
	`${authState.user.name}'s tasks` : "Task Manager"; 
}, [authState]); 



return ( 
	<> 
	<MainLayout> 
		{!isLoggedIn ? ( 
		<div className='bg-primary text-white 
		h-[40vh] py-8 text-center'> 
			<h1 className='text-2xl'> 
			Task Manager Application</h1> 
			<Link to="/signup" className='mt-10 
			text-xl block space-x-2 hover:space-x-4'> 
			<span className='transition-[margin]'> 
				Let's get started! Click here to join.</span> 
			<span className='relative ml-4 text-base 
			transition-[margin]'> 
				<i className="fa-solid fa-arrow-right"></i></span> 
			</Link> 
		</div> 
		) : ( 
		<> 
			<h1 className='text-lg mt-8 mx-8 border-b 
			border-b-gray-300'>Welcome {authState.user.userName}!</h1> 
			<Tasks /> 
		</> 
		)} 
	</MainLayout> 
	</> 
) 
} 

export default Home
