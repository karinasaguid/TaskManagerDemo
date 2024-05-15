import React from 'react'
import Navbar from '../components/nav-bar'; 

const MainLayout = ({ children }) => { 
	return ( 
		<> 
			<div className='relative bg-gray-50 
	h-screen w-screen overflow-x-hidden'> 
				<Navbar /> 
				{children} 
			</div> 
		</> 
	) 
} 

export default MainLayout;
