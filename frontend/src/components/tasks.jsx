import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Tasks = () => {
    const authState = useSelector(state => state.authReducer);
    const [tasks, setTasks] = useState([]);
    const [fetchData, { loading, error }] = useFetch();
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortByStatus, setSortByStatus] = useState(false);

    const fetchTasks = useCallback(() => {
        const config = {
            url: "/tasks",
            method: "get",
            headers: { Authorization: authState.token }
        };
        fetchData(config, { showSuccessToast: false })
            .then(data => setTasks(data.tasks))
            .catch(error => console.error("Error fetching tasks:", error));
    }, [authState.token, fetchData]);

    useEffect(() => {
        document.title = "Dashboard"; 
    }, []);
    
    useEffect(() => {
        if (!authState.isLoggedIn) return;
        fetchTasks();
    }, [authState.isLoggedIn, fetchTasks]);

    const handleDelete = (id) => {
        const config = {
            url: `/tasks/${id}`,
            method: "delete",
            headers: { Authorization: authState.token }
        };
        fetchData(config)
            .then(() => fetchTasks())
            .catch(error => console.error("Error deleting task:", error));
    };

    const handleFilterChange = e => {
        setStatusFilter(e.target.value);
    };

    const toggleSortByStatus = () => {
        setSortByStatus(!sortByStatus);
    };

    const filteredTasks = tasks.filter(task => statusFilter === "All" || task.status === statusFilter);
    const sortedTasks = sortByStatus ? filteredTasks.sort((a, b) => a.status.localeCompare(b.status)) : filteredTasks;

    if (loading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="my-2 mx-auto max-w-[700px] py-4">
            <div className="flex items-center mb-4">
                <h2 className='my-2 ml-2 md:ml-0 text-xl'>
                    Your tasks ({sortedTasks.length})
                </h2>
                <div className="ml-auto">
                    <label>Status Filter:</label>
                    <select value={statusFilter} onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="Not started">Not started</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button onClick={toggleSortByStatus}>Sort by Status</button>
                </div>
            </div>
            {sortedTasks.length === 0 ? (
                <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                    <span>No tasks found</span>
                    <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task</Link>
                </div>
            ) : (
                sortedTasks.map((task, index) => (
                    <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                        <div className='flex'>
                            <Link to={`/tasks/${task._id}`} className='font-medium'>
                                Task #{index + 1}
                            </Link>
                            <button className='ml-auto mr-2 text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)} aria-label="Delete Task">
                            <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                        <div className='whitespace-pre'>{task.title}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Tasks;
