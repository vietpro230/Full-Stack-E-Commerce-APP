import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'

import { FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const  { fetchUserDetails, fetchUserAddToCart } = useContext(Context)


    const handleSubmit =  async (e) => {
        e.preventDefault()

        

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataAPI = await dataResponse.json()
    
        

        if (dataAPI.success) {
            //toast.success(dataAPI.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        else {
            console.log('Login failed')
            // toast.error(dataAPI.message)
        }


    }


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }













    return (
        <section id="login">
            <div className='mx-auto container p-4 '>
                <div className='bg-white p-2  mx-auto outline-offset-1 w-full max-w-sm'>

                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} alt='login' className='mx-auto' />
                    </div>

                    <form>
                        <div className='grid'>
                            <label>Email : </label>
                            <input type='email' className='border p-1'
                                value={data.email}
                                name='email'
                                onChange={handleOnChange} />


                        </div>


                        <div className='relative grid item '>
                            <label>Password : </label>
                            <input type={showPassword ? "text" : "password"}
                                className='border p-1'
                                value={data.password}
                                name='password'
                                onChange={handleOnChange} />
                            <span className='absolute right-2 top-8 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>


                        <div className='flex justify-end pb-4'>

                            <Link to='/forgot-password' className='text-blue-500'>Forgot password</Link>

                        </div>


                        <div className='flex justify-center'>
                            <button className='bg-blue-500 text-white p-2 mt-2 w-full rounded-full max-w-48'
                                onClick={handleSubmit}
                            >Login</button>
                        </div>

                        <div className='pt-4'>
                            <p>Don't have account ?
                                <Link to='/signup' className='text-blue-500'> Sign up</Link>

                            </p>
                        </div>

                    </form>
                </div>


            </div>
        </section>
    )
}



export default Login