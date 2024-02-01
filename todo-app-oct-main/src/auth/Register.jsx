import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from './AuthContext';

function Register(props) {
    const { register, message, setMessage } = useContext(AuthContext);
    const [formData, setFormData] = useState({});
    const inputField = useRef(null);

    // for form validation
    // error and dirty states to manage error messages and input

    // dirty= for checking if the user has typed anything or not
    const [errors, setErrors] = useState({
        email: [],
        name: [],
        password: []
    });

    const [dirty, setDirty] = useState({
        email: false,
        name: false,
        password: false
    });

    // function for validation the inputs
    const validate = () => {
        let errorsData = {
            email: [],
            name: [],
            password: []
        };

        // Check if formData is defined
        if (formData) {
            // Email
            if (!formData.email) {
                errorsData.email.push("Please provide email");
            } else {
                let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                if (!emailreg.test(formData.email)) {
                    errorsData.email.push("Please enter a valid email");
                }
            }

            // Name
            if (!formData.name) {
                errorsData.name.push("Please provide a name");
            }

            // Password
            if (!formData.password) {
                errorsData.password.push("Please provide a password");
            }
        } else {
            // Handle the case where formData is undefined
            errorsData.email.push("Please provide email");
            errorsData.name.push("Please provide a name");
            errorsData.password.push("Please provide a password");
        }

        setErrors(errorsData);
    };

    useEffect(() => {
        validate();
    }, [formData]);

    const isValid = () => {
        let valid = true;
        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false;
            }
        }
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onBlurHandle = (e) => {
        const { name } = e.target;
        setDirty((dirty) => ({
            ...dirty,
            [name]: true
        }));
        validate();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (isValid()) {
            register(formData);
        } else {
            const currValue = inputField.current.value;
            if (!currValue) {
                Object.keys(dirty).forEach((abc) => (dirty[abc] = true));
            }
            setMessage("Please resolve errors in the form");
        }
    };

    useEffect(() => {
        setMessage("");
    }, []);

    return (
        <form>
            <div className='mb-3'>
                <label className='form-level'>Name</label>
                <input
                    ref={inputField}
                    type='text'
                    className='form-control'
                    name='name'
                    onChange={handleChange}
                    onBlur={onBlurHandle}
                />
                <div className='txt-danger'>
                    {dirty["name"] && errors["name"][0] ? errors["name"] : ""}
                </div>

                <label className='form-level'>Email</label>
                <input
                    ref={inputField}
                    type='email'
                    className='form-control'
                    name='email'
                    onChange={handleChange}
                    onBlur={onBlurHandle}
                />
                <div className='txt-danger'>
                    {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </div>

                <label className='form-level'>Password</label>
                <input
                    ref={inputField}
                    type='password'
                    className='form-control'
                    name='password'
                    onChange={handleChange}
                    onBlur={onBlurHandle}
                />
                <div className='txt-danger'>
                    {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                </div>
            </div>
            {message}
            <button className='btn btn-primary' onClick={submitForm}>
                Register
            </button>
        </form>
    );
}

export default Register;
