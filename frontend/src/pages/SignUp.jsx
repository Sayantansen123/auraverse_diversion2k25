import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion} from "framer-motion"
import axios from 'axios'
import { toast } from 'react-toastify'

const SignUp = () => {

    const navigate = useNavigate()
    const [loading , setLoading] = useState(false);
    const [inputData , setInputData] = useState({});

    const handelInput=(e)=>{
        setInputData({
            ...inputData , [e.target.id]:e.target.value
        })
    }

    const handelSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        console.log(inputData);
        if(inputData.password !== inputData.confpassword.toLowerCase()){
            setLoading(false)
            return toast.error("Password Dosen't match")
        }
        try {
            const register = await axios.post("http://localhost:5000/api/user/register",inputData);
            const data = register.data;
            if(data.success === false){
                setLoading(false)
                toast.error(data.message)
                console.log(data.message);
            }
            toast.success(data?.message)
            localStorage.setItem('auraverse',JSON.stringify(data))
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Starts below and hidden
            animate={{ opacity: 1, y: 0 }} // Moves up and fades in
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="max-w-lg w-[700px] px-3 relative ">          
            <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-lg  overflow-hidden "
            >
                <div className="p-6 ">
                    <h2 className="text-center text-3xl font-medium text-white max-md:text-2xl">
                        Join Us
                    </h2>
                    <div className='relative'>
                        <p className="mt-2 text-center text-white max-md:text-sm" id='horizontalbar'>Sign Up to continue</p>
                    </div>
                    <form method="POST" onSubmit={handelSubmit} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">

                            <div className='flex gap-2'>

                                <div className='flex-1'>
                                    <label className="sr-only" >First Name</label>
                                    <input
                                        placeholder="First Name"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required=""
                                        autocomplete="firstname"
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        onChange={handelInput}
                                    />
                                </div>

                                <div className='flex-1'>
                                    <label className="sr-only" htmlFor="email">last Name</label>
                                    <input
                                        placeholder="Last Name"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        required=""
                                        autocomplete="lastname"
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        onChange={handelInput}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="sr-only" htmlFor="email">Email address</label>
                                <input
                                    placeholder="Email address"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autocomplete="email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handelInput}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="sr-only" htmlFor="password">Password</label>
                                <input
                                    placeholder="Password"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autocomplete="current-password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handelInput}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="sr-only" htmlFor="password">Confirm Password</label>
                                <input
                                    placeholder="Confirm Password"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autocomplete="current-password"
                                    type="password"
                                    name="password"
                                    id='confpassword'
                                    onChange={handelInput}
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                type="submit" >
                                {loading ? "loading..":"Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }} // Starts below and hidden
                    animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                    transition={{ duration: 0.6, ease: "easeIn" }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-lg text-center">
                    <span className="text-white">Already have an account?</span>
                    <Link to="/login" className="font-medium text-indigo-500 hover:text-indigo-400 px-2">Login</Link>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default SignUp
