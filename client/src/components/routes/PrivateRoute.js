import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showloading, hideloading } from "../../redux/features/alertSlice";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { setUser } from "../../redux/features/auth/authSlice";

const PrivateRoute = ({ children }) => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const getUser = async () => {
        try {
            dispatch(showloading())
            const { data } = await axios.post('/api/v1/user/getUser',
                { token: localStorage.getItem('token') }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,


                }
            })
            dispatch(hideloading())
            if (data.success) {
                dispatch(setUser(data.data))
            } else {
                localStorage.clear();
                < Navigate to="/login" />
            }
        } catch (error) {
            localStorage.clear()
            dispatch(hideloading())
            console.log(error)
        }
    }
    useEffect(() => {
        if (!user) {
            getUser()
        }
    })
}

export default PrivateRoute;