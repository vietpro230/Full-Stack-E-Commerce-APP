import React from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import imageTobase64 from '../helpers/imageTobase64';




const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [image, setImage] = React.useState('')

  const navigate = useNavigate()




  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    profilePic: "",
  })


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }



  const handlePicure = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })


  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      console.log("data", JSON.stringify(data));
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data)
      });



      const dataAPI = await dataResponse.json();
    

      if (dataAPI.success) {
        toast.success(dataAPI.message);
        navigate('/login');
      } else {
        toast.error(dataAPI.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const jsonBody = JSON.stringify(data);
//         console.log("Size of data sent:", new Blob([jsonBody]).size, "bytes");

//         const response = await fetch(SummaryApi.signUP.url, {
//             method: 'POST', // Assuming POST is used here universally.
//             headers: { 'Content-Type': 'application/json' },
//             body: jsonBody
//         });

//         if (!response.ok) {
//             if (response.status === 413) {
//                 toast.error("Data too large. Please reduce the size of your files or data.");
//             } else {
//                 toast.error("An error occurred. Please try again.");
//             }
//             console.error('HTTP error', response.status);
//             return;
//         }

//         const dataAPI = await response.json();
//         console.log("dataAPI", dataAPI);

//         if (dataAPI.success) {
//             toast.success(dataAPI.message);
//             navigate('/login');
//         } else {
//             toast.error(dataAPI.message);
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//         toast.error("An unexpected error occurred. Please try again.");
//     }
// };



  const validatePassword = (password, confirmPassword) => {
    return confirmPassword === password
  }









  return (
    <section id="signup">
      <div className='mx-auto container p-4 '>
        <div className='bg-white p-2  mx-auto outline-offset-1 w-full max-w-sm'>

          <div className='w-20 h-20 mx-auto flex  rounded-full relative'>
            <img
              src={data.profilePic || loginIcon}
              alt='signup'
              className='mx-auto rounded-full'
            />

            <input type='file' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
              name='profilePic'
              onChange={handlePicure} />




          </div>

          <form>

            <div className='grid'>
              <label>User name</label>
              <input type='text'
                className='border p-1'
                value={data.username}
                name='username'
                onChange={handleOnChange} />
            </div>


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
                name='password'
                value={data.password}
                onChange={handleOnChange} />
              <span className='absolute right-2 top-8 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <span className='text-red-500'>{validatePassword(data.password, data.confirmPassword) ? '' : 'Password does not match'}</span>



            <div className='relative grid item '>
              <label>Confirm Password : </label>
              <input type={showConfirmPassword ? "text" : "password"}
                className='border p-1'
                value={data.confirmPassword}
                name='confirmPassword'
                onChange={handleOnChange}
              />
              <span className='absolute right-2 top-8 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>




            <div className='flex justify-end pb-4'>

              <Link to='/forgot-password' className='text-blue-500'>Forgot password</Link>

            </div>


            <div className='flex justify-center'>
              <button className='bg-blue-500 text-white p-2 mt-2 w-full rounded-full max-w-48'
                onClick={handleSubmit}
              >Sign Up</button>
            </div>

            <div className='pt-4'>
              <p>Already have account ?
                <Link to='/login' className='text-blue-500'> Login </Link>

              </p>
            </div>

          </form>
        </div>


      </div>
    </section>
  )
}

export default SignUp