import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import '../css/Profile.css'; // Import custom CSS

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if(!refreshToken) {
        throw new Error('No refresh token is found');
      }
      const response = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Failed to refresh token', error);
      setError('Session expired. please log in again. ');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      return null;
    }
  };

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile response:", response.data);
      setProfile(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchProfile(newToken);
        }
      } else {
        setError('Failed to fetch profile');
        console.error('Failed fetching profile', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchProfile(token);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/profile', {
        username,
        email,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Update response:", response.data);
      setProfile(response.data);
      setError('');
      setSuccessMessage('Profile updated successfully!'); // Set success message
    } catch (error) {
      setError('Failed to update profile');
      console.error('Failed updating profile', error);
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Display success message */}
      {profile ? (
        <div className="card profile-card mx-auto">
          <div className="card-body text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-circle mb-3"
            />
            <h5 className="card-title"><FaUser /> {profile.username}</h5>
            <p className="card-text"><FaEnvelope /> {profile.email}</p>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning text-center">No profile data available.</div>
      )}
    </div>
  );
};

export default Profile;