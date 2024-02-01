import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Login(props) {

    const {login, message, setMessage} = useContext(AuthContext);

    const [formData, setFormData]=useState();
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const submitForm=(e)=>{
        e.preventDefault();
        login(formData);
    }


    useEffect(()=>{
        setMessage("");
    },[])
    
    //if we use filter in urls then use (?)  (for matching purpose )
    // (&) use for multiple values
    return (
     <form>
        <div className='mb-3'>
            <label className='form-level'>Email</label>
            <input type="text" name='email' className='form-control' onChange={handleChange}/>
        </div>
         
        <div className='mb-3'>
            <label className='form-level'>Password</label>
            <input type="password" name='password' className='form-control' onChange={handleChange}/>
        </div>
        {message}
        <button className='btn btn-info' onClick={submitForm}>Submit</button>
     </form>
    );
}

export default Login;