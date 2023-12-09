import React, { useState } from 'react';
<<<<<<< HEAD
import InputFrom from './../Components/shared/InputFrom';
import { Link } from 'react-router-dom'


=======
import InputFrom from '../components/shared/InputFrom';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideloading, showloading } from '../redux/features/alertSlice';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
>>>>>>> 46b04f1929ef61ef3c5dc059b4b6d48bdf062e16
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    //hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //redux state
    const { loading } = useSelector(state => state.alerts)

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showloading())
            const { data } = await axios.post('/api/v1/auth/login', { email, password })
            if (data.success) {
                dispatch(hideloading())
                localStorage.setItem('token', data.token)
                toast.success('Login Successfully')
                navigate('/dashboard')
            }
        } catch (error) {
            dispatch(hideloading());
            toast.error('Invalid Credential please try again');
            console.log(error);
        }

    };

    return (
        < >
            {loading ? (<Spinner />) : (
                <div className='form-container'>
                    <form className='card p-2' onSubmit={handleSubmit}>
                        <img src='/images/logo/job-board-icon.png'
                            alt='logo'
                            height={150}
                            width={400}
                        />


                        <InputFrom
                            htmlFor="email"
                            labelText={"Email"}
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
                                Not a user<Link to="/register">Register Here!</Link>{" "}
                            </p>
                            <button type='submit' className='btn btn-primary'>
                                Login
                            </button>
                        </div>
                    </form>

                </div>
            )}
        </>
    )
}

export default Login
