import React, { useState } from 'react';
<<<<<<< HEAD
import { Await, Link, useNavigate } from 'react-router-dom';
import InputFrom from '../Components/shared/InputFrom';
=======
import { Link, useNavigate } from 'react-router-dom';
import InputFrom from '../components/shared/InputFrom';
>>>>>>> 46b04f1929ef61ef3c5dc059b4b6d48bdf062e16
import { useDispatch, useSelector } from 'react-redux';
import { hideloading, showloading } from '../redux/features/alertSlice';
import axios from 'axios'
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
const Register = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    //redux start
    const { loading } = useSelector(state => state.alerts);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name || !lastName || !email || !password) {
                return toast.error('Please Provide All Fields')
            }
            dispatch(showloading())
            const { data } = await axios.post('/api/v1/auth/register', { name, lastName, email, password });
            dispatch(hideloading());
            if (data.success) {
                toast.success('Register Successfully');
                navigate('/login');
            }
        } catch (error) {
            dispatch(hideloading());
            toast.error('Invalid Form Details Please Try Again');
            console.log(error);
        }

    };
    return (
        <>
            {loading ? (<Spinner />) : (
                <div className='form-container'>
                    <form className='card p-2' onSubmit={handleSubmit}>
                        <img src='/images/logo/job-board-icon.png'
                            alt='logo'
                            height={150}
                            width={400}

                        />
                        <InputFrom
                            htmlFor="name"
                            labelText={"Name"}
                            type={'text'}
                            value={name}
                            handleChange={(e) => setName(e.target.value)}
                            name="name"
                        />
                        <InputFrom
                            htmlFor="lastname"
                            labelText={"LastName"}
                            type={'text'}
                            value={lastName}
                            handleChange={(e) => setLastName(e.target.value)}
                            name="lastname"
                        />

                        <InputFrom
                            htmlFor="email"
                            labelText={"email"}
                            type={"email"}
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            name="email"
                        />

                        <InputFrom
                            htmlFor="password"
                            labelText={"Password"}
                            type={"password"}
                            value={password}
                            handleChange={(e) => setpassword(e.target.value)}
                            name="password"
                        />

                        <div className='d-flex justify-content-between'>
                            <p>
                                Already Register<Link to="/login">Login</Link>
                            </p>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Register;
