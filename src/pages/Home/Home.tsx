import Pokemon from 'features/pokemon/Pokemon';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Home</h1>
      <Pokemon />
      <div style={{ marginTop: 50 }}>
        <button onClick={() => navigate('/login')}>Login here</button>
      </div>
    </>
  );
};

export default Home;
