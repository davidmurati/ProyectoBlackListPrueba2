import React, { useEffect } from "react";
import "./home.css";
import logo1 from './logo1.jpg';


const Home = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar las credenciales del usuario aquí
    
      window.location.href = '/Login';
  };

  
  return (

    <form onSubmit={handleSubmit}>
    <div>
      
      <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        <h1>Black list</h1>
        </div>
        
        <main>
        
        <p>Por favor, inicia sesión o regístrate para continuar</p>
        <button type="submit">Iniciar sesión</button>
    
      </main>
      </div>
    
    </form>
  );
};

export default Home;
