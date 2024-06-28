import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)

  const navigate = useNavigate()


  useEffect(() => {
    if(user?.role !== ROLE.ADMIN){
      navigate('/')
    }
   
  }, [user])
  return (
    <div className='min-h-[calc(100vh-120px)]  md:flex hidden'>
      <aside className=' min-h-full w-full max-w-60  bg-blue-900 text-white'>
        <div className='h-32 flex items-center justify-center flex-col'>
          <div className='text-5xl cursor-pointer flex relative justify-center'>
            {
              user?.profilePic ? (<img src={user?.profilePic} alt={user.username} className='w-10 h-10 rounded-full' />) : (<FaRegUserCircle />)
            }
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.username}</p>
          <p>{user?.role}</p>
        </div>

        <div>
          <nav className='grid p-4'>
            <Link to = { "all-users"} className='px-2 py-1 hover:bg-slate-100 '>All Users</Link>
            <Link to = { "all-product"} className='px-2 py-1 hover:bg-slate-100'>Products</Link>

          </nav>
        </div>

      </aside>


      <main className='w-full h-full p-2'>
        <Outlet />
      </main>

    </div>
  )
}

export default AdminPanel