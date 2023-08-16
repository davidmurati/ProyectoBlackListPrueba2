import { useState, useEffect  } from 'react'
import './Login.css';
import logo1 from './logo1.jpg';
import { createClient } from '@supabase/supabase-js'



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [data, setData] = useState([]);
  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);
  let[Plan, setPlan] = useState([]);
  
  let Plan1=""

  

  const readGoogleSheet = () => {
    // Sort results by id in descending order, take two
    // and return the age as an integer.

    fetch("https://sheetdb.io/api/v1/gy8uclmbwbqj8")
      .then((response) => response.json())
      .then((data) => {
        // Construir una cadena de texto con los valores de la hoja de cálculo
         //const text = data.map(row => `ID: ${row.Id}, Usuario: ${row.Usuario}, Correo: ${row.Correo}`).join('\n');
         //setData(text);

         emails = data.map(row => row.Usuario)


        //const emails = data.map(row => `Correo: ${row.Correo}, Clave: ${row.Clave}`)
        
        setEmails(emails);

         clave = data.map(row => row.Clave)
        setClave(clave);

        Plan = data.map(row => row.Plan)
        setPlan(Plan);


      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const correoConvertido=email
   const variable = correoConvertido.replace(/.com/g, '');

    let validCredentials1 = false;
    
    for (let i = 0; i < emails.length; i++) {
      
      if (email === emails[i] && password === clave[i]) {
        validCredentials1 = true;
        Plan1= Plan[i];
        break;
        
      }
    
      // Almacenar el valor de email en el contexto
    
    }


    if (validCredentials1===true ) {


      window.location.href = '/Consulta/'+ (variable) ;
      
    } else {
      alert('Correo electrónico o contraseña incorrectos');
    }
  };

  useEffect(() => {
    readGoogleSheet();
     
  }, []);

  
  return (
    
    <form onSubmit={handleSubmit}>
    
    <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        </div>

    <div className="contenido">

      <label>
        Correo electrónico:
        <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="boton" type="submit">Iniciar sesión</button  >


      
    </div> 


    </form>
    
  );

}

export default Login
