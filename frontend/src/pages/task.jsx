import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import Loader from '../components/utils/loader'; 
import useFetch from '../hooks/useFetch'; 
import MainLayout from '../layouts/main-layout'; 
import validateManyFields from '../validations'; 
import { Input, Textarea, Select } from '../components/utils/input';

const Task = () => { 
    const authState = useSelector(state => state.authReducer); 
    const navigate = useNavigate(); 
    const [fetchData, { loading }] = useFetch(); 
	console.log(useNavigate, "------useFetch")
    const { taskId } = useParams(); 

    const mode = taskId === undefined ? "add" : "update"; 
    const [task, setTask] = useState(null); 
    const [formData, setFormData] = useState({ 
    title: "", 
    description: "",
    dueDate: "", 
    status: "Not started" 
    });

    const [formErrors, setFormErrors] = useState({}); 

    useEffect(() => { 
        document.title = mode === "add" ? "Add task" : "Update Task"; 
    }, [mode]); 

    useEffect(() => { 
        if (mode === "update") { 
            const config = { 
                url: `/tasks/${taskId}`, 
                method: "get", 
                headers: { Authorization: authState.token } 
            }; 
            fetchData(config, { showSuccessToast: false }) 
                .then((data) => { 
                    setTask(data.task); 
                    const currentDate = new Date(data.task.dueDate).toISOString().split('T')[0];
                    setFormData({ 
                        title: data.task.title, 
                        description: data.task.description, 
                        dueDate: currentDate, 
                        status: data.task.status 
                    }); 
                }); 
        } 
    }, [mode, authState, taskId, fetchData]); 

	console.log(formData, "---formData")

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}	

    const handleReset = e => { 
        e.preventDefault(); 
        setFormData({ 
            title: task.title, 
            description: task.description, 
            dueDate: task.dueDate, 
            status: task.status 
        }); 
    } 

    const handleSubmit = e => { 
        e.preventDefault(); 
        const errors = validateManyFields("task", formData); 
        setFormErrors({}); 

        if (errors.length > 0) { 
            setFormErrors(errors.reduce((total, ob) => 
                ({ ...total, [ob.field]: ob.err }), {})); 
            return; 
        } 

        const config = { 
            url: mode === "add" ? "/tasks" : `/tasks/${taskId}`, 
            method: mode === "add" ? "post" : "put", 
            data: formData, 
            headers: { Authorization: authState.token } 
        }; 
        fetchData(config).then(() => { 
            navigate("/"); 
        }); 
    } 

    // console.log("***handle", handleSubmit())
    console.log("----------------FORMDATA", formData)

    const fieldError = (field) => ( 
        <p className={`mt-1 text-pink-600 text-sm 
    ${formErrors[field] ? "block" : "hidden"}`}> 
            <i className='mr-2 fa-solid fa-circle-exclamation'></i> 
            {formErrors[field]} 
        </p> 
    ) 

    return ( 
        <> 
            <MainLayout> 
                <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md' 
                    onSubmit={handleSubmit}>
                    {loading ? ( 
                        <Loader /> 
                    ) : ( 
                        <> 
                            <h2 className='text-center mb-4'>{mode === "add" ? 
                                "Add New Task" : "Edit Task"}</h2> 
                            <div className="mb-4"> 
                                <label htmlFor="title">Title</label> 
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {fieldError("title")} 
                            </div> 
                            <div className="mb-4"> 
                                <label htmlFor="description">Description</label> 
                                <Textarea 
                                    type="description" 
                                    name="description"
                                    id="description" 
                                    value={formData.description} 
                                    placeholder="Write here.."
                                    onChange={handleChange} /> 
                                {fieldError("description")} 
                            </div> 

                            <div className="mb-4">
                                <label htmlFor="dueDate">Due Date</label>
                                <Input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />
                                {fieldError("dueDate")}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status">Status</label>
                                <Select
                                    name="status"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Not started">Not started</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </Select>
                                {fieldError("status")}
                            </div>
                            
                        <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark'
                                onClick={handleSubmit}>{mode === "add" ? "Add task" : "Update Task"}</button> 
                            <button className='ml-4 bg-red-500 text-white px-4 py-2 font-medium'
                                onClick={() => navigate("/")}>Cancel</button> 
                            {mode === "update" && <button className='ml-4 bg-blue-500 text-white px-4 
               py-2 font-medium hover:bg-blue-600'
                                onClick={handleReset}>Reset</button>} 
                        </> 
                    )} 
                </form> 
            </MainLayout> 
        </> 
    ) 
} 

export default Task;