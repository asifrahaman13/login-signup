import { useState, useEffect, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';

export default function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const router = useRouter();
  useEffect(() => {
    // Use the nullish coalescing operator (??) to provide a default value
    const storedEmail = localStorage.getItem('email') ?? '';
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send a POST request to your Express.js API to handle OTP verification
    const response = await fetch('http://localhost:8000/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status==200) {
      const data = await response.json();
      setVerificationMessage(data.message);
      localStorage.removeItem('email');
      router.push('/login');
    } else {
      toast.error("Sorrt it was a wrong otp")
      setVerificationMessage('Invalid OTP. Please try again.');
    }
  };
  const handleResendOTP = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/resend-otp", {
      email: email
    })
    console.log(response);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
          <h1 className="text-2xl font-bold mb-6">Verify OTP</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="OTP"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => setOTP(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
          <p className="mt-4 text-red-500">{verificationMessage}</p>
          <button
            onClick={handleResendOTP}
            className="w-full bg-gray-300 text-white p-2 rounded hover:bg-gray-400 mt-4"
          >
            Resend OTP
          </button>
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
