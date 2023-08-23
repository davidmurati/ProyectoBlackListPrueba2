import { useState, useEffect  } from 'react'
import './Registrar.css';
import logo1 from '../Login/logo1.jpg';
import { createClient } from '@supabase/supabase-js'
import logo2 from './logoregistro.jpg';

import Select from 'react-select'




function Registrar() {
      


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Plan, setPlan] = useState('');

  const [option, setOption] = useState('');
  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);

  const [CorreoD, setCorreoD] = useState([]);
  

  let validCredentials1 = false;

  let contador="";
  

  const options = [
    { value: 'Free', label: 'Free' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Top', label: 'Top' }
  ]

  
    

const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
  
  //.............get

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


    //..............

    //.............................Insert


  async function getInsert() { 


    const { error } = await supabase
    .from('Usuarios2')
    .insert({ Correo: email, Clave: password, Plan: option, Contador: contador})

  }

    //.............................

    
  
  useEffect(() => {

    getCorreoD();
    getPlan();
    getClave();
     
  }, []);
  
 

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
      getInsert();
      
      alert(`Se ha registrado el usuario con ${email} con el correo ${password}.`);
    } else {
      alert('Usuario ya existente');
    }
      
    } else if (option==="Premium") {
      contador=0;
      setPlan("Premium")

      if (validCredentials1===false) {
        getInsert();
        
        alert(`Se ha registrado el usuario con ${email} con el correo ${password}.`);
      } else {
        alert('Usuario ya existente');
      }
      
      const correoConvertido=email
      const variable = correoConvertido.replace(/.com/g, '');
      window.location.href = '/Pago/' + (variable) ;
      
    }  else if (option==="Top") {
      contador=0;
      setPlan("Top")

      if (validCredentials1===false) {
        getInsert();
        
        alert(`Se ha registrado el usuario con ${email} con el correo ${password}.`);
      } else {
        alert('Usuario ya existente');
      }
      
      const correoConvertido=email
      const variable = correoConvertido.replace(/.com/g, '');
      window.location.href = '/Pago/' + (variable) ;
       
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
        <img src={logo2} className="App-logo" alt="logo" />
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