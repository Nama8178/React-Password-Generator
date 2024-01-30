import { useState, useCallback,useEffect,useRef} from 'react'

function App() {
  const [length,setLength] = useState(8);
  const [numAllowed,setnumAllowed] = useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const [password,setpassword] = useState("");
  const passwordGenrator = useCallback( () => {
    let temp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ";
    let num = "1234567890";
    let char = "~!@#$%^&*"; 
    let pass = ""   
    if(numAllowed){
      temp += num;
    }
    if (charAllowed) {
      temp += char;
    }
    for (let i = 1; i <= length; i++){
        let n = Math.floor(Math.random()*temp.length+1);
        pass += temp.charAt(n);
    }
    setpassword(pass);
  },[length,numAllowed,charAllowed,setpassword])

  // Copy to clipboard Function
  const passRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  })

  useEffect( () => {
    passwordGenrator();
  },[length,numAllowed,charAllowed,setpassword])
  return (
    <>
    <div className="flex justify-center items-start h-screen w-screen bg-gray-950">
      <div className="flex bg-slate-600 mt-20 w-1/3 justify-center rounded-xl p-4 flex-col">
        <h1 className="text-4xl text-center">Password Generator</h1>
        <div className="flex h-1/2 items-center"> 
          <input type="text" id="input" value={password} placeholder="Password" className="bg-slate-200 text-slate-600 rounded-sm w-3/4 p-1 m-2 mt-3 text-2xl mr-0" ref={passRef }/>
          <button onClick={() => copyToClipboard()} className="bg-blue-900 w-1/4 p-2 ml-1 m-2 rounded-sm mt-3">copy</button>
        </div>
        <div className="flex text-orange-500 p-2 justify-around">
          <input onChange={(e) => {setLength(e.target.value)}} type="range" min={3} max={100} value={length} id="range"/>
          <label htmlFor="range" >Length({length})</label>
          <input onChange= {() => {setnumAllowed((prev) => !prev)}} type="checkbox" defaultChecked={numAllowed} id="length" />
          <label htmlFor="length">Number</label>
          <input onChange= {() => {setcharAllowed((prev) => !prev)}} type="checkbox" defaultChecked={charAllowed} id="character" />
          <label htmlFor="character">Charachter</label>
        </div>
        <div className="flex items-center justify-center "><button className="transition hover:text-slate-800 hover:bg-slate-200 border-none" onClick={() => {passwordGenrator()}} >Generate </button></div>
      </div>    
    </div>
    </>
  )
}

export default App
