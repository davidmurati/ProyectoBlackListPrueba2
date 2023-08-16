import { useState, useEffect  } from 'react'
import './Soporte.css';
import logo1 from '../Login/logo1.jpg';

import { useParams} from 'react-router'
import { createClient } from '@supabase/supabase-js'

//import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';




function Soporte() {
      


  const [email1, setEmail] = useState('');
  const [TextFecha, setTextFecha] = useState('');
  const [TextProblema,setTextProblema] = useState('');
  const [data, setData] = useState('');
  const [Estado, setEstado] = useState('');

// use destructuracion y paso de parametros que se tiene en el link
let {email} = useParams();
console.log(useParams);
//

const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL1, 
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY1);


const PostGoogleSheet = () => {
    fetch("https://sheetdb.io/api/v1/rmwydxwdvfk0m", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify([
    {
      Cliente: email+".com",
      Fecha: TextFecha,
      Problema: TextProblema,
      Estado: "Por confirmar",
      
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
  
 // fin de post 


 const readGoogleSheet = () => {
    // Sort results by id in descending order, take two
    // and return the age as an integer.

    fetch("https://sheetdb.io/api/v1/rmwydxwdvfk0m")
      .then((response) => response.json())
      .then((data) => {
        // Construir una cadena de texto con los valores de la hoja de cálculo
         const text = data.map(row => ` Cliente: ${row.Cliente}, Estado: ${row.Estado}`).join('\n');
         
         

         const text2 = data.map(({ Cliente }) => Cliente)
         const text3 = data.map(({ Estado }) => Estado)

         for (let i = 0; i < text2.length; i++) {
            if (email+".com" === text2[i]) {
                setEstado(text3[i])
              break;
            } else {
                setEstado("No se encontro cita")
            }
          }
    

         setData(text);

 

        
      });
  };
 
  useEffect(() => {
    //readGoogleSheet();
     
  }, []);
  

  const Enviar = async (event) => {
    event.preventDefault();

    PostGoogleSheet();
    
    try {
        
        //window.location.href = '/Plan/'+ (variable);

    } catch (error) {
        console.error(error);
        alert('No ha podido enviar la informacion');
    }


  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    Enviar();

  };

  const Estado1 = (event) => {
    event.preventDefault();
    readGoogleSheet();

  };

  

  return (
    
    <form onSubmit={handleSubmit}>
    
    <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        </div>

    <div className="contenido">

      <label>
        Correo electrónico: {email+".com"}
      </label>
      <label>
        Fecha de la cita:
        <input  type="date" value={TextFecha} onChange={(e) => setTextFecha(e.target.value)} />
      </label>
      <label>
        Problema a resolver:
        <input  type="text" value={TextProblema} onChange={(e) => setTextProblema(e.target.value)} />
      </label>
      

      <button className="boton" onClick={Enviar}>Enviar</button>
      

      <label>
        Consulta del estado del soporte:
        {Estado}
      </label>
      <button className="boton" onClick={Estado1}>Estado</button>

      
    </div> 
    </form>
    
  );

}

export default Soporte