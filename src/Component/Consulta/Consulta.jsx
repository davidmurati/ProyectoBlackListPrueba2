import { useState, useEffect } from 'react'
import './Consulta.css';
import logo1 from '../Login/logo1.jpg';
import logo2 from './logoconsulta.jpg';
import { createClient } from '@supabase/supabase-js'

import { useParams} from 'react-router'


function Consulta() {
  const [textoC, setTextoC] = useState('');
  const [CorreoND, setCorreoND] = useState([]);


  //xxxxxxxxxxx
  
  let[Plan1, setPlan1] = useState([]);
  let[Contador11, setContador11] = useState([]);

  let n=0;

  const [CorreoD, setCorreoD] = useState([]);
  let [Plan, setPlan] = useState([]);
  const [contador, setContador] = useState([]);


  //let Contador11="";

  //let Plan1=""

  // use destructuracion y paso de parametros que se tiene en el link
  let {email} = useParams();
  console.log(useParams);
//

  
 
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

async function getContador() { 

  const { data, error } = await supabase
  .from('Usuarios2')
  .select('Contador')

  setContador(data.map(row => row.Contador))

}


//...............get correo no deseado

async function getCorreoND() { 

    const { data, error } = await supabase
    .from('TablaCorreo')
    .select('NoDeseado')
  
    setCorreoND(Object.values(data));

};

//..............................

 function BusquedaPlan() { 

  for (let i = 0; i < CorreoD.length; i++) {
      
    if (email+".com" === CorreoD[i]) {
      //alert("hola david");
      setContador11(contador[i]);
      setPlan1(Plan[i]);
      //alert(Plan1);
      break;
      
    }
  
  }
  alert(Plan1);

};




useEffect( () => { 

    getCorreoD();
    getPlan();
    getContador()
    getCorreoND();
    Consultar();

}, []);

//......................................

const Ayuda = (event) => {
    
    if (Plan1==="Free") {
        alert("Aumente su plan para porde usar el soporte");
        
        
      } else if (Plan1==="Premium") {
        //alert("soporte");
        window.location.href = '/Soporte/'+ (email);
      }  else if (Plan1==="Top") {
        //alert("soporte");
        window.location.href = '/Soporte/'+ (email);
      }else {
        alert("Vuelva a intentar despues de consultar o revise su plan");
      }
    

  };

  //.......................modificar

  async function getModificar() { 

    const { error } = await supabase
    .from('Usuarios2')
    .update({ Contador: Contador11-1 })
    .eq('Correo', email+".com")

  };

  //..................................

  const handleSubmit = (event) => {
    event.preventDefault();

    
    Consultar();
    
  };

//.......................................
  
  const Consultar = async (event) => {
    event.preventDefault();


    for (let i = 0; i < CorreoD.length; i++) {
      
      if (email+".com" === CorreoD[i]) {
        
        setContador11(contador[i]);
        setPlan1(Plan[i]);
        //alert(Plan1);
        break;
        
      }
    
    }

      
//asignar cantidad de consulta segun su condicion

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
    alert("Intente de nuevo o revise su registro");
  }

  if (Contador11>0) {
    
    // consulta
    for (let i = 0; i < CorreoND.length; i++) {
        if (textoC === Object.values(CorreoND[i])[0]) {
            alert("Correo o dominio NO deseado");
          break;
        } else if (i === CorreoND.length-1) {
            alert("El correo o dominio no esta en la base de datos");
          
        }
      } 


      setContador11(Contador11-1);
      // incremento del contador y subida a supabase

      let validCredentials1 = false;
    
    for (let i = 0; i < CorreoD.length; i++) {
      
      if (email+".com" === email+".com" ) {
        validCredentials1 = true;
        break;
        
      }
    }

    if (validCredentials1===true ) {


    getModificar()

    //alert(`Se ha modificado o eliminado el usuario.`);
  
  }

    }else {
      //  alert("No puede buscar mas");
      }

  };
  

  

  return (

    
    <form onSubmit={handleSubmit}>

   
    
    <div className="logo-container">
        <img src={logo2} className="App-logo" alt="logo" />
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