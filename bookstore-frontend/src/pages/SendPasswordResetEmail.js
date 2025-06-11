import React, { useState } from 'react';
import axios from 'axios';

const SendPasswordResetEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-password-reset-email', { email });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError('Failed to send password reset email');
      console.error('Failed sending password reset email', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Send Password Reset Email</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Email</button>
      </form>
    </div>
  );
};

export default SendPasswordResetEmail;