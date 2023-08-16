import { useState, useEffect } from 'react'
import './Consulta.css';
import logo1 from '../Login/logo1.jpg';
import { createClient } from '@supabase/supabase-js'

import { useParams} from 'react-router'


function Consulta() {
  const [textoC, setTextoC] = useState('');
  const [option, setOption] = useState('');
  const [tarea, setTarea] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  let [Plan, setPlan] = useState([]);
  const [ContadorPlan, setContadorPlan] = useState("");
  const [CorreoD, setCorreoD] = useState([]);

  let [Contador1, setContador1] = useState([]);
  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);
  
  let[Plan1, setPlan1] = useState([]);
  let[Contador11, setContador11] = useState([]);

  let n=0;


  //let Contador11="";

  //let Plan1=""

  // use destructuracion y paso de parametros que se tiene en el link
  let {email} = useParams();
  console.log(useParams);
//

  
 
  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
                                import.meta.env.VITE_APP_SUPABASE_ANON_KEY);

// capturar el conteo y el plan del usuario

//lectura de datos get para leer plan y usuario

const readGoogleSheet = () => {
  // Sort results by id in descending order, take two
  // and return the age as an integer.

  fetch("https://sheetdb.io/api/v1/0hteizp6h4e7q")
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

      Contador1 = data.map(row => row.Contador)
      setContador1(Contador1);


      Plan = data.map(row => row.Plan)
      setPlan(Plan);

      

    });

    for (let i = 0; i < emails.length; i++) {
      
      if (email+".com" === emails[i]) {
        //alert("hola david");
        setContador11(Contador1[i]);
        setPlan1(Plan[i]);
        alert(Plan1);
        break;
        
      }
    
      // Almacenar el valor de email en el contexto
    
    }


};




async function getCorreoD() { 

    const { data, error } = await supabase
    .from('TablaCorreo')
    .select('NoDeseado')
  
    setCorreoD(Object.values(data));

};



useEffect( () => { 

    readGoogleSheet();
    getCorreoD();


    
}, []);

const Ayuda = (event) => {
    
    if (Plan1==="Free") {
        alert("Aumente su plan para porde usar el soporte");
        
        
      } else if (Plan1==="Premium") {
        alert("soporte");
        window.location.href = '/Soporte/'+ (email);
      }  else if (Plan1==="Top") {
        alert("soporte");
        window.location.href = '/Soporte/'+ (email);
      }else {
        alert("No posee plan");
      }
    

  };

  const handleSubmit = (event) => {
    event.preventDefault();




    Consultar();
    

  };

  
  const Consultar = async (event) => {
    event.preventDefault();


    for (let i = 0; i < emails.length; i++) {
      
      if (email+".com" === emails[i]) {
        
        setContador11(Contador1[i]);
        setPlan1(Plan[i]);
        //alert(Plan1);
        break;
        
      }
    
      // Almacenar el valor de email en el contexto
    
    }


      


// asignar cantidad de consulta segun su condicion

if (Plan1==="Free") {
    n=20;
    setPlan("Free")
    
  } else if (Plan1==="Premium") {
    n=40;
    setPlan("Premium")
    
  }  else if (Plan1==="Top") {
    n=60;
    setPlan("Top")
     
  }else {
    n=0;
    alert("No tiene plan asignado revise su registro");
  }

  if (Contador11>0) {
    
    // consulta
    for (let i = 0; i < CorreoD.length; i++) {
        if (textoC === Object.values(CorreoD[i])[0]) {
            alert("Correo o dominio NO deseado");
          break;
        } else if (i === CorreoD.length-1) {
            alert("El correo o dominio no esta en la base de datos");
          
        }
      } 


      setContador11(Contador11-1);
      // incremento del contador y subida a supabase

      ////////////////////////////

      let validCredentials1 = false;
    
    for (let i = 0; i < emails.length; i++) {
      
      if (email+".com" === email+".com" ) {
        validCredentials1 = true;
        break;
        
      }
    }

    if (validCredentials1===true ) {

    // Update first row setting the name to "Jack Doe"
    fetch(`https://sheetdb.io/api/v1/0hteizp6h4e7q/Usuario/${email+".com"}`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Correo: email+".com",
        Contador: Contador11-1,
    }),
  })
    .then((r) => r.json())
    .then(console.log)
    .catch(console.error);

    alert(`Se ha modificado o eliminado el usuario.`);

}

////////////////////////////////////

    
    }else {
      //  alert("No puede buscar mas");
      }



  };
  

  

  return (

    
    <form onSubmit={handleSubmit}>

   
    
    <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        </div>

    <div className="contenido">

    
     <label>
        Correo o dominio a inspeccionar:
        <input  type="text" value={textoC} onChange={(e) => setTextoC(e.target.value)} />
      </label>
      
      <label>
        Tipo de plan que tiene:{Plan1+Contador11} 
      </label>

      
      <button className="boton" onClick={Consultar}>Consultar</button>
      <button className="boton" onClick={Ayuda}>Solicitar soporte</button>
      
    </div> 

    </form> 
    
   

  );

}

export default Consulta