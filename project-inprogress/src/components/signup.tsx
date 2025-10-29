import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react'; 
import './signup.css'; 

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

function SignupForm() {
  const REQUIRED_DOMAIN = '@cpu.edu.ph';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>(''); 
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmailError(null);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!formData.email.endsWith(REQUIRED_DOMAIN)) {
      const errorMsg = `Sorry, only CPU email addresses are allowed.`;
      setEmailError(errorMsg); 
      return; 
    }

    setEmailError(null); 
    setMessage('Submitting...');

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Signup successful!');
      } else {
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Could not connect to the server.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <h1>Count your Progress Today!</h1>
        <p>
          Transform your unfinished project ideas into reality. Connect with peers based on your courses, skills, and passions.
        </p>
        <div className="login-prompt">
          <p>Already have an account?</p>
          <button className="login-button">Login Here!</button>
        </div>
      </div>

      <div className="right-panel">
        <h2>Start your Journey Today!</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          {}

          {}
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="CPU email address"
            value={formData.email}
            onChange={handleChange}
            required
            className={emailError ? 'input-error' : ''}
          />
          {}
          {emailError && <p className="validation-error">{emailError}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="get-started-button">
            Get Started
          </button>
        </form>
        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
}

export default SignupForm;