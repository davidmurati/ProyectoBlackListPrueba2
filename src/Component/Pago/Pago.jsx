import { useState, useEffect  } from 'react'
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

import { createClient } from '@supabase/supabase-js'
import { useParams} from 'react-router'

let cont=0;

let cont2=0;


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  cont2=0;
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);

    //..................................

  cont2=1;

  } catch (err) {
    setError(err.message);
    cont2=0;
  }
};

 function Pago() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);
  let[Plan, setPlan] = useState([]);
  
  const [CorreoD, setCorreoD] = useState([]);

  let [valor, setValor] = useState('');
  //let valor=0.002
  let contador="";
  let Plan1="";

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
  
  
  
      //..............


  useEffect(() => {
    getCorreoD();
    getPlan();
   

    
    for (let i = 0; i < CorreoD.length; i++) {
      
        if (email+".com" === CorreoD[i]) {
          
          Plan1=Plan[i]
          break;
          
        }
      }


    if (Plan1==="Top") {
        setValor(0.004)
        contador=60;
      }else {
        setValor(0.002)
        contador=40;
       // alert(Plan1)
      }

    
  }, []);


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < CorreoD.length; i++) {
      
        if (email+".com" === CorreoD[i]) {
          
          Plan1=Plan[i]
          break;
          
        }
      }


    if (Plan1==="Top") {
        setValor(0.004)
        contador=60;
      }else {
        setValor(0.002)
        contador=40;
      }


    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    })
   
    if (cont2===1) {
      getPago()
      
     //window.location.href = '/Login' ;
      
    }else {
      alert("No se realizo el pago");
    }
    //alert(cont2);
    
  };

  

     //.......modificar

  async function getPago() { 

    const { error } = await supabase
    .from('Usuarios2')
    .update({ Contador: contador })
    .eq('Correo', email+".com")

  }

  
  ;
    
    



  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Realizar Pago
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                value="0xb6C95441f302e464C0049878570E9c550A1F73b6"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                value={valor}
              />
            </div>
          </div>
          <button
            type="submit"
            className="boton"
          >
            Pago
          </button>
          
        </main>

      </div>
    </form>
  );
}

export default Pago