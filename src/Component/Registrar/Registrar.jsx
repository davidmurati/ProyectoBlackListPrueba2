import { useState, useEffect  } from 'react'
import './Registrar.css';
import logo1 from '../Login/logo1.jpg';
import { createClient } from '@supabase/supabase-js'

import Select from 'react-select'




function Registrar() {
      


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Plan, setPlan] = useState('');

  const [option, setOption] = useState('');
  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);

  let validCredentials1 = false;

  let contador="";

  const options = [
    { value: 'Free', label: 'Free' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Top', label: 'Top' }
  ]

  const readGoogleSheet = () => {
    // Sort results by id in descending order, take two
    // and return the age as an integer.
  
    fetch("https://sheetdb.io/api/v1/gy8uclmbwbqj8")
      .then((response) => response.json())
      .then((data) => {
        // Construir una cadena de texto con los valores de la hoja de cálculo
         //const text = data.map(row => `ID: ${row.Id}, Usuario: ${row.Usuario}, Correo: ${row.Correo}`).join('\n');
         //setData(text);
  
         emails = data.map(row => row.Correo)
  
        //const emails = data.map(row => `Correo: ${row.Correo}, Clave: ${row.Clave}`)
        
        setEmails(emails);
  
         clave = data.map(row => row.Clave)
        setClave(clave);
  
        
      });
  };
  
  useEffect(() => {
    readGoogleSheet();
     
  }, []);
  
  const PostGoogleSheet = () => {
    fetch("https://sheetdb.io/api/v1/gy8uclmbwbqj8", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify([
    {
      Usuario: email,
      Clave: password,
      Plan: option,
      Contador: contador,
      
    },

  ]),
})
  .then((r) => r.json())
  .then((data) => {
    // The response comes here
    console.log(data);
  })
  .catch((error) => {
    // Errors are reported there
    console.log(error);
  });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();


 // let validCredentials1 = false;
 for (let i = 0; i < emails.length; i++) {
  if (email === emails[i]) {
    validCredentials1 = true;
    
    break;
  }
}
    

    if (option==="Free") {
      contador=20;
      setPlan("Free")

      // Realiza la validación y el registro del usuario aquí
    if (validCredentials1===false) {
      PostGoogleSheet();
      
      alert(`Se ha registrado el usuario con ${email} con el correo ${password}.`);
    } else {
      alert('Usuario ya existente');
    }
      
    } else if (option==="Premium") {
      contador=0;
      setPlan("Premium")

      if (validCredentials1===false) {
        PostGoogleSheet();
        
        alert(`Se ha registrado el usuario con ${email} con el correo ${password}.`);
      } else {
        alert('Usuario ya existente');
      }
      
      //const correoConvertido=email
      //const variable = correoConvertido.replace(/.com/g, '');
      window.location.href = '/Pago/' + (option) ;
      
    }  else if (option==="Top") {
      contador=0;
      setPlan("Top")

      if (validCredentials1===false) {
        PostGoogleSheet();
        
        alert(`Se ha registrado el usuario con ${email} con el correo ${password}.`);
      } else {
        alert('Usuario ya existente');
      }
      
      window.location.href = '/Pago/' + (option);
       
    }else {
      contador=o;
      alert("No tiene plan asignado revise su registro");
    }
  

    

  };



  const find = ({ value }) => {
    
    console.log(value);
    setOption(value);
  };

  

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
      <div className="selector">
      <label>
        Plan de pago:
      </label>
            <Select options={options} 
             onChange={(e) => find(e)}/>
      
      </div>

      <button className="boton" type="submit">Registrar</button  >

      
    </div> 
    </form>
    
  );

}

export default Registrar