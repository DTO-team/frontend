import { Auth } from './AwsConfig';
import React, { useState } from 'react';

const signup = async ({ username, password, email }) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        // other custom attributes
      },
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
};

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    signup({ username: email, password, email });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <label htmlFor="password">Password</label>
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
