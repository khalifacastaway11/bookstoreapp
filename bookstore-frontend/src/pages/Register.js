import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register= ()=>{
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password },{timeout: 5000});
      console.log("register response:",response.data)
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      navigate('/books'); // Redirect to books page
    } catch (error) {
      setError("register failed please check the email and password")
      console.error("Register failed:", error);
    } finally{
      setLoading(false);
    }
  };

  return(
    <div className="container mt-5">
    <h1>Register</h1>
    <form onSubmit={handleRegister}>
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
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      </div>  
  )
}

export default Register;