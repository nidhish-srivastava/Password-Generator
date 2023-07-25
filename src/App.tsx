import { ChangeEvent, useEffect, useState } from "react"

const Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()"
function App() {
  const [strength,setStrength] = useState(0)
  const [password,setPassword] = useState("")
  const [length,setLength] = useState(4)
  const [string,setString] = useState(Characters)
  const [includeLowerCase,setIncludeLowerCase] = useState(false)
  const [includeUpperCase,setIncludeUpperCase] = useState(false)
  const [includeNumbers,setIncludeNumbers] = useState(false)
  const [includeSymbols,setIncludeSymbols] = useState(false)
  const [strengthStatus,setStrengthStatus] = useState("")

  const copyHandler = () =>{
    navigator.clipboard.writeText(password)
    alert("Password Copied")
  }
  

  const generatePassword = () =>{
    if(!includeLowerCase && !includeSymbols && !includeUpperCase && !includeNumbers){
      alert("Atleast choose one")
      return //* if we dont use return,the code below it will run
    }
    let pass = ""
    for(let i=0;i<length;i++){
     let indexRandom =  Math.floor(Math.random()*string.length)
     pass += string[indexRandom]
    }
    setPassword(pass)
  }

  const applyFilters = () : string =>{
    let chars = ""
    if (includeUpperCase) chars += Characters.replace(/[^A-Z]/g, '')  //* ^ means ki include it,otherwise it wud exclude it
    if (includeLowerCase) chars += Characters.replace(/[^a-z]/g, '')
    if (includeNumbers) chars += Characters.replace(/[^0-9]/g, '')
    if (includeSymbols) chars += Characters.match(/[!@#$%^&*()]/g)?.join("");
    console.log(chars);
    return chars
  }

  
  const handleCheckBox = (e : ChangeEvent<HTMLInputElement>) : void =>{
    const {checked,name} = e.target
    switch(name){
      case 'includeUpperCase' : 
      setIncludeUpperCase(checked)
      break
      case 'includeLowerCase' : 
      setIncludeLowerCase(checked)
      break
      case 'includeNumbers' : 
      setIncludeNumbers(checked)
      break
      case 'includeSymbols' : 
      setIncludeSymbols(checked)
      break
      default : 
      break
    }
  }
  useEffect(()=>{
      setString(applyFilters())
  },[includeLowerCase,includeUpperCase,includeNumbers,includeSymbols])

  // const getPasswordStrength = () =>{
  //   let strength = 0

  // if(password.length>6) setStrength(5)
  // if(password.length>8) setStrength(7)
  // if(password.length>10) setStrength(10)

  // // Check for uppercase letters
  // if (/[A-Z]/.test(password)) {
  //   strength += 1;
  // }

  // // Check for lowercase letters
  // if (/[a-z]/.test(password)) {
  //   strength += 1;
  // }

  // // Check for numbers
  // if (/[0-9]/.test(password)) {
  //   strength += 1;
  // }

  // // Check for symbols
  // if (/[!@#$%^&*()]/.test(password)) {
  //   strength += 1;
  // }
  //  setStrength(strength)
  // }

  // useEffect(()=>{
  //     getPasswordStrength()
  // },[password])

  // useEffect(()=>{
  //    strength==1 && setStrengthStatus("Very-Weak")
  //    strength == 2 && setStrengthStatus("Weak")
  //    strength == 5  && setStrengthStatus("Medium")
  //    strength ==7 && setStrengthStatus("Good")
  //    strength == 10 && setStrengthStatus("Strong")
  // },[strength])

  return (
    <>
    <h2 className = "text-3xl font-bold underline">
    {password}
    </h2>
    <button onClick={copyHandler} >Copy</button>
    <br />
    <h2>Character Length : {length}</h2>
      <input type="range" min="4" max="16" value={length} onChange={e=>setLength(+e.target.value)}/>
      <br />
      <input type="checkbox" name="includeUpperCase" onChange={handleCheckBox} checked={includeUpperCase} />
      <label htmlFor="">Include UpperCase Letters</label>
      <br />
      <input type="checkbox" name="includeNumbers" checked={includeNumbers} onChange={handleCheckBox} />
      <label htmlFor="">Include Numbers</label>
      <br />
      <input type="checkbox" name="includeLowerCase" onChange={handleCheckBox} checked={includeLowerCase} />
      <label htmlFor="">Include Lowercase Letters</label>
      <br />
      <input type="checkbox" name="includeSymbols" onChange={handleCheckBox} checked={includeSymbols} />
      <label htmlFor="">Include Symbols</label>
      <br />
      {/* {strength!=0 && <h2>Strength {strengthStatus}</h2>} */}
      <button onClick={generatePassword} >Generate Password</button>
    </>
  )
}

export default App