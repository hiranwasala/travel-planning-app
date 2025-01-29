import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PopUp from './PopUp';
import google from '../assets/images/google.png';
import emailIcon from '../assets/images/mail.png';
import travel from '../assets/images/travel.png';
import close from '../assets/images/close.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { BASE_URL } from '../constants';

const Navbar = () => {
  const [popup, setPopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleSignUp = () => {
    setSignUpPopup(true);
    setEmailPopup(false);
    setPopup(false);
  };

  const handleSignIn = () => {
    setEmailPopup(true);
    setSignUpPopup(false);
    setPopup(false);
  };

  const handleSignInPopup = () => {
    setPopup(true);
    setEmailPopup(false);
    setSignUpPopup(false);
  };

  const handleSignInButton = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSignUpButton = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/users/`, {
        email,
        password,
        confirmPassword,
      });
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="bg-transparent absolute top-5 left-0 right-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-black font-bold text-lg">
          TourPlanner
        </Link>
        <button
          className="text-black lg:hidden focus:outline-none"
          type="button"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="oi oi-menu">Menu</span>
        </button>
        <div
          id="navbar-menu"
          className="hidden lg:flex lg:items-center lg:space-x-6"
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6">
            <li>
              <Link to="/" className="text-black px-5 py-2 hover:opacity-80">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Plan" className="text-black px-5 py-2 hover:opacity-80">
                Plan
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black px-5 py-2 hover:opacity-80">
                About
              </Link>
            </li>
            <li>
              <Link to="/places" className="text-black px-5 py-2 hover:opacity-80">
                Places
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-black px-5 py-2 hover:opacity-80"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item cta">
              <button
                onClick={handleSignInPopup}
                className="text-white border border-white px-5 py-2 rounded-full bg-black hover:opacity-80"
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Sign In Popup */}
      {popup && (
        <PopUp trigger={popup} setTrigger={setPopup} width="w-full" maxWidth="max-w-md">
          <div className="relative p-4">
            <img
              src={close}
              className="absolute top-2 right-2 w-4 h-4 cursor-pointer"
              alt="close-icon"
              onClick={() => setPopup(false)}
            />
            <img src={travel} className="w-10 h-10 my-4" alt="travel-icon" />
            <h2 className="text-xl font-medium">Sign In to unlock the best of TourPlanner</h2>
            <button className="rounded-full mb-4 mt-10 w-full h-12 bg-transparent border-2 border-black inline-flex items-center justify-center">
              <span className="mr-2.5">
                <img src={google} className="w-6 h-6" alt="google-icon" />
              </span>
              Continue with Google
            </button>
            <button
              className="rounded-full w-full h-12 bg-transparent border-2 border-black inline-flex items-center justify-center"
              onClick={handleSignIn}
            >
              <span className="mr-2.5">
                <img src={emailIcon} className="w-6 h-6" alt="email-icon" />
              </span>
              Continue with Email
            </button>
            <p className="mt-16 text-xs font-light">
              By proceeding, you agree to our{' '}
              <span className="underline cursor-pointer">Terms of Use</span> and
              confirm you have read our{' '}
              <span className="underline cursor-pointer">Privacy and Cookie Statement</span>
            </p>
          </div>
        </PopUp>
      )}

      {/* Email Popup */}
      {emailPopup && (
        <PopUp trigger={emailPopup} setTrigger={setEmailPopup} width="w-full" maxWidth="max-w-md">
          <div className="relative p-4">
            <img
              src={close}
              className="absolute top-2 right-2 w-4 h-4 cursor-pointer"
              alt="close-icon"
              onClick={() => setEmailPopup(false)}
            />
            <img src={travel} className="w-10 h-10 my-4" alt="email-icon" />
            <h2 className="text-xl font-medium">Welcome Back</h2>
            <div className="w-full flex items-center bg-transparent border-2 border-black mt-4 rounded-xl">
              <i className="fas fa-envelope text-gray-500 ml-3"></i>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 bg-transparent pl-3 outline-none"
              />
            </div>
            <div className="w-full flex items-center bg-transparent border-2 border-black mt-4 rounded-xl">
              <i className="fas fa-lock text-gray-500 ml-3"></i>
              <input
                type="password"
                placeholder="Enter your password"
                className="flex-1 h-12 bg-transparent pl-3 outline-none"
              />
            </div>
            <p className="text-xs text-right mt-2 cursor-pointer">Forgot Password?</p>
            <button onClick={handleSignInButton} className="rounded-full w-full h-12 bg-black text-white mt-6">
              Sign In
            </button>
            <div className="flex items-center justify-center mt-4 mb-6">
              <div className="w-1/4 h-0.5 bg-gray-300"></div>
              <p className="mx-2 text-sm ">Not a member?</p>
              <div className="w-1/4 h-0.5 bg-gray-300"></div>
            </div>
            <span className="text-sm text-gray-500 ml-6">
              <button onClick={handleSignUp} className="underline text-sm text-black font-medium">
                Join
              </button>{' '}
              to unlock the best of TourPlanner
            </span>
          </div>
        </PopUp>
      )}

      {/* Sign Up Popup */}
      {signUpPopup && (
        <PopUp trigger={signUpPopup} setTrigger={setSignUpPopup} width="w-full" maxWidth="max-w-md">
          <div className="relative p-4">
            <img
              src={close}
              className="absolute top-2 right-2 w-4 h-4 cursor-pointer"
              alt="close-icon"
              onClick={() => setSignUpPopup(false)}
            />
            <img src={travel} className="w-10 h-10 my-4" alt="email-icon" />
            <h2 className="text-xl font-medium">Welcome to TourPlanner</h2>
            <div className="w-full flex items-center bg-transparent border-2 border-black mt-4 rounded-xl">
              <i className="fas fa-envelope text-gray-500 ml-3"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-12 bg-transparent pl-3 outline-none"
              />
            </div>
            <div className="w-full flex items-center bg-transparent border-2 border-black mt-4 rounded-xl">
              <i className="fas fa-lock text-gray-500 ml-3"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="flex-1 h-12 bg-transparent pl-3 outline-none"
              />
            </div>
            <div className="w-full flex items-center bg-transparent border-2 border-black mt-4 rounded-xl">
              <i className="fas fa-lock text-gray-500 ml-3"></i>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="flex-1 h-12 bg-transparent pl-3 outline-none"
              />
            </div>
            <button onClick={handleSignUpButton} className="rounded-full w-full h-12 bg-black text-white mt-6">
              Sign Up
            </button>
          </div>
        </PopUp>
      )}
    </nav>
  );
};

export default Navbar;
