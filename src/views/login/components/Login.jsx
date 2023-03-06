import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services';
import styles from './login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.clear();
  }, []);


  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const verifiedUser = await AuthService.login(email);

      if (!verifiedUser) {
        setError('Invalid Credentials!');
      } else {

        navigate('/albums');
        // navigate('/posts')
      }
    } catch (error) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className={styles.login_main}>
      <h1 className={styles.header}>Log in</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.email}
          type='email'
          id='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='Email'
        />
        <input className={styles.password} type='password' placeholder='Password' />
        <button className={styles.submit_btn} type='submit'>
          LOG IN
        </button>
        {error && <div className={styles.errorMsg}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;