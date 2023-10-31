
import React from 'react'
import NavLink from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

async function fetchDetails(accessToken: string) {
    try {
        const response = await axios.get('http://localhost:8000/user-details', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Replace with the actual access token
            },
        });

        const userDetails = response.data.userDetails;
        return userDetails

    } catch (error) {
        console.log(error);
    }
};


const Navbar = () => {
    const [userDetails, setUserDetails] = useState({
        "email": "",
        "fullName": "",
        "companyName": "",
        "role": "",
        "department": "",
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            setIsLoggedIn(true);
            fetchDetails(access_token).then((userDetails) => {
                setUserDetails(userDetails);
            });
        }
    }, []);

    function deleteLocalStorage() {
        localStorage.removeItem('access_token');
        // router.push('/')
        window.location.reload();
    }

    return (
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-blue-900 mb-4 md:mb-0">
                        
                        <span className="ml-3 text-xl">Proacure</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {isLoggedIn == true ? <NavLink href="/" className="mr-5 hover:text-gray-900" onClick={() => {
                            deleteLocalStorage()
                        }}>Logout</NavLink> :
                            <><NavLink href="/signup" className="mr-5 hover:text-gray-900">Signup</NavLink>
                                <NavLink href="/login" className="mr-5 hover:text-gray-900">Login</NavLink></>}
                    </nav>

                </div>
            </header>
            {isLoggedIn && <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg w-full sm:w-1/3">
                    <h1 className="text-2xl font-bold mb-6 my-2">Welcome, User! Your details are as follows: </h1>
                    <div

                        className="w-full bg-blue-400 text-white p-2 rounded my-2"
                    >
                        {userDetails?.email}
                    </div>
                    <div

                        className="w-full bg-blue-400 text-white p-2 rounded my-2"
                    >
                        {userDetails?.fullName}
                    </div>
                    <div

                        className="w-full bg-blue-400 text-white p-2 rounded my-2"
                    >
                        {userDetails?.companyName}
                    </div>
                    <div

                        className="w-full bg-blue-400 text-white p-2 rounded my-2"
                    >
                        {userDetails?.role}
                    </div>
                    <div

                        className="w-full bg-blue-400 text-white p-2 rounded my-2"
                    >
                        {userDetails?.department}
                    </div>
                </div>
            </div>}

            {!isLoggedIn && <div className="bg-blue-500 min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Join Us Today</h2>
                    <p className="text-gray-600 mb-4">Unlock a world of opportunities. Sign up now to get started.</p>
                    <NavLink href="/signup">
                        <button className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105">
                            Sign Up
                        </button>
                    </NavLink>
                    <p className="text-gray-600 mt-4">Already have an account? <NavLink href="/login" className="text-blue-500 hover:underline" >Log in</NavLink></p>
                </div>
            </div>}


        </>
    )
}

export default Navbar