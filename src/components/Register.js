import React,{useState} from 'react';

function Register() {
const[name,setName] = useState("");
const[email,setEmail] = useState("");
const[message,setMessage] =useState("");
const[password,setPassword] = useState("");
const[loading,setLoading] = useState(false)


const handleRegister = async(event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try{
const response = await fetch(
    "http://localhost:5000/register",
    {method:"POST",
        headers: {
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    }
);
const data = await response.json();

if(!response.ok){
    setMessage(data.message || "Registration Failed." );
    return;
}

setMessage("Account created successfully! You can log in now")
setEmail("");
setName("");
setPassword("");
}catch(error){
    setMessage("Could not connect to the server.");

}finally{
    setLoading(false);
}

};

  return (
    <div className='register-conatiner'>
      <h2>Create Your Account</h2>
      <form onSubmit={handleRegister  }>
<label>FULL NAME</label>
<input
type='text'
value={name}
onChange={(event)=> setName(event.target.value)}
placeholder='Enter your full name '
required
/>
<label>EMAIL ADDRESS</label>
<input
type='text'
value={email}
onChange={(event)=> setEmail(event.target.value)}
placeholder='Enter your email'
required
/>
<label>PASSWORD</label>
<input
type='number'
value={password}
onChange={(event)=> setEmail(event.target.value)}
placeholder='Create password'
minLength={8}
maxLength={72}
required
/>
<button type='submit' disabled={loading}  >{loading ?"creating account...":"Register"}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Register
