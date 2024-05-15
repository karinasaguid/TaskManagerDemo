import api from "../../api";
import { 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    SAVE_PROFILE,
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE
} from "./actionTypes";
import { toast } from "react-toastify"; 
  
export const postLoginData = (emailAddress, password) => async (dispatch) => { 
    try { 
        dispatch({ type: LOGIN_REQUEST }); 
        const { data } = await api.post('/auth/login', { emailAddress, password }); 
        dispatch({ 
            type: LOGIN_SUCCESS, 
            payload: data, 
        }); 
        localStorage.setItem('token', data.token); 
        toast.success(data.msg); 
  
    } catch (error) { 
        const msg = error.response?.data?.msg || error.message; 
        dispatch({ 
            type: LOGIN_FAILURE, 
            payload: { msg } 
        }); 
        toast.error(msg); 
    } 
};

export const fetchTasks = (sortByStatus = '', statusFilter = '') => async (dispatch) => {
    try {
        dispatch({ type: FETCH_TASKS_REQUEST });

        // Construct the URL with sorting and filtering parameters
        let url = '/tasks';
        if (sortByStatus || statusFilter) {
            url += '?';
            if (sortByStatus) {
                url += `sortByStatus=${sortByStatus}&`;
            }
            if (statusFilter) {
                url += `status=${statusFilter}`;
            }
        }

        const { data } = await api.get(url);
        dispatch({ type: FETCH_TASKS_SUCCESS, payload: data.tasks });
    } catch (error) {
        dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
    }
};
  
export const saveProfile = (token) => async (dispatch) => { 
    try { 
        const { data } = await api.get('/profile', { headers: { Authorization: token } }); 
        dispatch({ 
            type: SAVE_PROFILE, 
            payload: { user: data.user, token }, 
        }); 
    } catch (error) { 
        // console.log(error); 
    } 
};

export const logout = () => (dispatch) => { 
    localStorage.removeItem('token'); 
    dispatch({ type: LOGOUT }); 
    document.location.href = '/'; 
};
