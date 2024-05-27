// App.js
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// Firebase configuration
const firebaseConfig = {
  
  apiKey: "AIzaSyCIlQql7jozAyIkmHRjKvzNRSDy2Py5j4A",
  authDomain: "login-page-c4bc2.firebaseapp.com",
  projectId: "login-page-c4bc2",
  storageBucket: "login-page-c4bc2.appspot.com",
  messagingSenderId: "22666689037",
  appId: "1:22666689037:web:8651aa5585b9a2cf41f344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [showSignup, setShowSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // Track if passwords match
  const [loginError, setLoginError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false); // Set passwords match state to false
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful");

      // Redirect to login page after successful signup
      setShowSignup(false); // Hide signup form
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");

      // Clear input fields
      setEmail('');
      setPassword('');
      setLoginError('');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordMatch(true); // Reset password match state
    setLoginError(''); // Reset login error
  };

  return (
    <div className="container">
      {showSignup ? (
        <div className="form-container">
          <h2>Hey, hello </h2>
          <p  style={{color:"grey"}}>Enter the information you entered While registering</p>
          <h3>Sign up</h3>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <div className='eye'>
              <label>Create Password</label>
              <span className="toggle-eye" onClick={togglePasswordVisibility}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
              </div>    
              <div className="password-input">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              {!passwordMatch && <p className="error-message">Passwords do not match</p>}
            </div>
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <h2>Welcome back ...</h2>
          <p  style={{color:"grey"}}> Glad to see you again</p>
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {loginError && <p className="error-message">{loginError}</p>}
            </div>
            <div className="form-actions">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
