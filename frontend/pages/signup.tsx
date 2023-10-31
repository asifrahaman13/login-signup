import { useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.css"
import axios from 'axios';

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const router = useRouter();





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(passwordConfirmation, password);

        if (passwordConfirmation != password) {
            console.log("sadfasd")
            toast.error('Passwords do not match');
            // return 
        }

        // Send a POST request to your Express.js API to handle signup
        const response = await axios.post('http://localhost:8000/signup', {
            fullName,
            companyName,
            email,
            password,
            role,
            department,
        });

        console.log(response.status);

        if (response.status == 203) {
            toast.error('A user with the email address already exists');
        }

        if (response.status == 200) {
            localStorage.setItem('email', email)
            router.push('/otp');
        } else {
            toast.error('Please fill the details properly');
            // Handle signup failure
        }
    };

    return (
        <>
            <div className="min-h-screen flex">
                <div className="w-1/2">
                    <img
                        src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg"
                        alt="Signup"
                        className="object-cover h-screen w-full"
                    />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
                        <h1 className="text-2xl font-bold mb-6">Signup</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="confirm password"
                                placeholder="Confirm Password"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Department"
                                className="w-full mb-6 p-2 border border-gray-300 rounded"
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <ToastContainer
                position="top-right" // Set the position to "top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
