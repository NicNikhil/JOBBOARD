import React from "react";
import { Link } from 'react-router-dom'
import "../styles/Homepage.css";

const HomePage = () => {
    return (<>
        <video autoPlay muted loop id="myVideo">
            <source src="/images/bg.mp4" type="video/mp4" />
        </video>
        <div className="content">
            <div className="card w-25">
                <img src="/images/logo/job-board-icon.png" alt="logo" />
                <hr />
            </div>
            <div className="card-body">
                <h5 className="card-title">Leading Career Platform</h5>
                <p className="card-text">
                    Search and manage your jobs with ease.
                </p>
                <div>
                    <p>
                        Not a user register <Link to="/register">Here!</Link>{" "}
                    </p>
                    <p>
                        <Link to
                            ="/login" className="myBtn">Login</Link>
                    </p>
                </div>
            </div>


        </div>
    </>
    );
};

export default HomePage;


