import { useState, useEffect  } from 'react'
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";


import { useParams} from 'react-router'



const startPayment = async ({ setError, setTxs, ether, addr }) => {
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
  } catch (err) {
    setError(err.message);
  }
};

 function Pago() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  let[emails, setEmails] = useState([]);
  let[clave, setClave] = useState([]);
  let[Plan, setPlan] = useState([]);
  const [email, setEmail] = useState('');

  let [valor, setValor] = useState('');
  //let valor=0.002
  let contador="";

  // use destructuracion y paso de parametros que se tiene en el link
  let {Plan1} = useParams();
  console.log(useParams);
//

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

  useEffect(() => {
    readGoogleSheet();

    
     
  }, []);



  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (Plan1==="Top") {
        setValor(0.004)
        contador=60;
      }else {
        setValor(0.002)
        contador=40;
        alert(Plan1)
      }

    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
    //pagobueno();
    try {
    //    alert("hola mundo");

///////////////////////
        let validCredentials1 = false;
    
    for (let i = 0; i < emails.length; i++) {
      
      if (email === emails[i]) {
        validCredentials1 = true;
        break;
        
      }
    }

    if (validCredentials1===true ) {

    // Update first row setting the name to "Jack Doe"
    fetch(`https://sheetdb.io/api/v1/gy8uclmbwbqj8/Usuario/${email}`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Correo: email,
        Plan: useParams,
        Contador: contador,
    }),
  })
    .then((r) => r.json())
    .then(console.log)
    .catch(console.error);

   //alert(`Se ha modificado o eliminado el usuario.`);

} }

////////////////////////////////////
  catch (error) {
        alert("No se efectuo el pago ");
      }
  };

  const pagobueno = () => {
    
    if (error==="") {
     //   alert("hola mundo");

///////////////////////
        let validCredentials1 = false;
    
    for (let i = 0; i < emails.length; i++) {
      
      if (email === emails[i]) {
        validCredentials1 = true;
        break;
        
      }
    }

    if (validCredentials1===true ) {

    // Update first row setting the name to "Jack Doe"
    fetch(`https://sheetdb.io/api/v1/gy8uclmbwbqj8/Usuario/${email}`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Correo: email,
        Plan: Plan1,
        Contador: contador,
    }),
  })
    .then((r) => r.json())
    .then(console.log)
    .catch(console.error);

   // alert(`Se ha modificado o eliminado el usuario.`);

}

////////////////////////////////////
      }else {
        alert("No se efectuo el pago");
      }

  };



  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
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
          <label>
        Correo electrónico:
        <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pago
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}

export default Pago