import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import useFetch from '../hooks/useFetch'; 
import validateManyFields from '../validations'; 
import {Input, Select, Textarea} from './utils/input'; 
import Loader from './utils/loader'; 

const SignupForm = () => { 
    const [formErrors, setFormErrors] = useState({}); 
    const [formData, setFormData] = useState({ 
        userName: "", 
        emailAddress: "", 
        password: ""
    }); 
    const [fetchData, { loading }] = useFetch(); 
    const navigate = useNavigate(); 

    const handleChange = e => { 
        setFormData({ 
            ...formData, [e.target.name]: e.target.value 
        }); 
    } 

    const handleSubmit = e => { 
        e.preventDefault(); 
        const errors = validateManyFields("signup", formData); 
        setFormErrors({}); 
        if (errors.length > 0) { 
            setFormErrors(errors.reduce((total, ob) => 
                ({ ...total, [ob.field]: ob.err }), {})); 
            return; 
        } 

        const config = { url: "/auth/signup", method: "post", data: formData }; 
        fetchData(config).then(() => { 
            navigate("/login"); 
        }); 

    } 

    const fieldError = (field) => ( 
        <p className={`mt-1 text-pink-600 text-sm 
    ${formErrors[field] ? "block" : "hidden"}`}> 
            <i className='mr-2 fa-solid fa-circle-exclamation'></i> 
            {formErrors[field]} 
        </p> 
    ) 

    return ( 
        <> 
            <form className='m-auto my-16 max-w-[500px] 
    p-8 bg-white border-2 shadow-md rounded-md'> 
                {loading ? ( 
                    <Loader /> 
                ) : ( 
                    <> 
                        <h1 className='text-center mb-4'> 
                            WELCOME! <br/>
                            
                            Sign-up here</h1> 
                        <div className="mb-4"> 
                            <label htmlFor="userName" className="after:content-['*'] 
        after:ml-0.5 after:text-red-500">Username</label> 
                            <Input type="text" name="userName" id="userName"
                                value={formData.userName} placeholder="Your username"
                                onChange={handleChange} /> 
                            {fieldError("userName")} 
                        </div> 

                        <div className="mb-4"> 
                            <label htmlFor="emailAddress" className="after:content-['*'] 
        after:ml-0.5 after:text-red-500">Email</label> 
                            <Input type="email" name="emailAddress" id="emailAddress"
                                value={formData.emailAddress} placeholder="youremail@domain.com"
                                onChange={handleChange} /> 
                            {fieldError("emailAddress")} 
                        </div> 

                        <div className="mb-4"> 
                            <label htmlFor="password" className="after:content-['*'] 
        after:ml-0.5 after:text-red-500">Password</label> 
                            <Input type="password" name="password" id="password"
                                value={formData.password} placeholder="Enter your password"
                                onChange={handleChange} /> 
                            {fieldError("password")} 
                        </div> 

                        <button className='bg-primary text-white px-4 py-2 
        font-medium hover:bg-primary-dark'
        style={{ position: 'relative', marginLeft: '183px' }}
                            onClick={handleSubmit}>Submit</button> 

                    </> 
                )} 

            </form> 
        </> 
    ) 
} 

export default SignupForm;
