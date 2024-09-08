import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import myContext from '../../context/data/MyContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
   const[name,setName] = useState("");
   const[email,setEmail] = useState("");
   const[password,setPassword] = useState("");

   const context = useContext(myContext);
   const { loading, setLoading } = context;

   const signup= async()=>{
    setLoading(true)    
    if(name==="" || email==="" || password===""){
        return toast.error("All feilds are required")
    }

    try {
        const users = await createUserWithEmailAndPassword(auth,email,password)
       
        const user ={
            name:name,
            uid:users.user.uid,
            email:users.user.email,
            time:Timestamp.now()
        }

        const userRef = collection(fireDB,"users")
        await addDoc(userRef,user)
        toast.success("SignUp Succesfull")
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false)
      
    } catch (error) {
   console.log(error)
    }
   }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="Name"
                        name={name}
                        onChange={(e)=>setName(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input type="email"
                        name={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                    
                </div>
                <div>
                    <input
                        type="password"
                        name={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup