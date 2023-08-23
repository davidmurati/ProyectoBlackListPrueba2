import { useState, useEffect  } from 'react'
import './Login.css';
import logo1 from './logo1.jpg';
import { createClient } from '@supabase/supabase-js';

  
    



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);
  let[Plan, setPlan] = useState([]);
  
 

  const [CorreoD, setCorreoD] = useState([]);
  


//..................................
const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY);

  async function getCorreoD() { 

    const { data, error } = await supabase
    .from('Usuarios2')
    .select('Correo')

    setCorreoD (data.map(row => row.Correo))

    //alert(CorreoD)


}

async function getPlan() { 

  const { data, error } = await supabase
  .from('Usuarios2')
  .select('Plan')

  setPlan(data.map(row => row.Plan))


}

async function getClave() { 

  const { data, error } = await supabase
  .from('Usuarios2')
  .select('Clave')

  setClave(data.map(row => row.Clave))

  //alert(clave[1])

}


//.................................


  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const correoConvertido=email
   const variable = correoConvertido.replace(/.com/g, '');

    let validCredentials1 = false;
    
    for (let i = 0; i < CorreoD.length; i++) {
      
      if (email === CorreoD[i] && password === clave[i]) {
        validCredentials1 = true;
        
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

    getCorreoD();
    getPlan();
    getClave();
     
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
