import React, { useContext } from 'react'
import Logo from './Logo'
import { IoMdSearch } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../store/userSlice';
import { useState } from 'react';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll('q') 
  const [search, setSearch] = useState(searchQuery)




  const dispatch = useDispatch()



  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logOut.url, {
        method: SummaryApi.logOut.method,
        credentials: 'include',


      })

      const data = await fetchData.json()

      if (data.success) {
        dispatch(setUserDetails(null))
        navigate('/')
        toast.success(data.message)
        
      }
      else {
        toast.error(data.message)
      }

    }
    catch (error) {
      console.error('An error occurred:', error);
    }

  }

  // console.log("header add to cart count", context)

  const handleSearch = (e) => {
    const { value } = e.target

    if(value) {
      navigate(`/search?q=${value}`)
    }
    else {
      navigate('/')
    }
  }



  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-10'>
      <div className='container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to = "/">
          <Logo w='100' h='60' />
          </Link>
        </div>

        <div className='hidden lg:flex mx-auto items center focus-within:shadow-md border rounded-full w-full justify-between max-w-sm'>
          <input type="text" placeholder="Search" className=" w-full outline-none pl-2 " 
           onChange={handleSearch} />
          <div>
            <IoMdSearch size={24} className='text-lg min-w-[50px] h-8 bg-blue-600 rounded-r-full cursor-pointer'
           />
          </div>
        </div>


        <div className='flex items-center gap-4'>
          <div className='relative  flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegUserCircle />
                    )
                  }
                </div>
              )
            }
            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel"}
                          className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                          onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                  </nav>
                </div>
              )

            }

          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>

                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{
                    context?.cartProductCount
                    }</p>
                </div>
              </Link>
            )
          }


          <div>

            {user?._id ? (
              <button
                onClick={handleLogout}
                className='bg-blue-400 text-white rounded-full hover:bg-blue-600 px-3 py-1 inline-block text-center'
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className='bg-blue-400 text-white rounded-full hover:bg-blue-600 px-3 py-1 inline-block text-center'
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header