import React from 'react'
import ROLE from '../common/role'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,

}) => {



  const [userRole, setUserRole] = useState(role)
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value)
  }

  const handleSave = async () => {
    const fectchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        userId : userId,
        role : userRole
       
      })
    })

    const responseData = await fectchResponse.json()

    if (responseData.success) {
      toast.success(responseData.message)
      callFunc()
      onClose()
    }
    if (responseData.error) {
      toast.error(responseData.message)
    }


   


  }



  return (

    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className='pb-4 text-lg font-medium'>
          Change User Role
        </h1>
        <p>Name: {name}</p>
        <p>Email : {email}</p>
        <div className='flex items-center justify-between my-4'>
          <p>Role: </p>
          <select className='boder px-4 py-1' value={userRole} onChange={handleOnChangeSelect} >
            {
              Object.values(ROLE).map(r => {
                return (
                  <option value={r} key={r}>{r}</option>
                )
              }
              )
            }
          </select>
        </div>

        <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={handleSave}>Save</button>
      </div>
    </div>

  )
}

export default ChangeUserRole