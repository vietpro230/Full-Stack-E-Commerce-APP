import React from 'react'
import SummaryApi from '../common'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole'



const AllUser = () => {
  const [allUsers, setAllUsers] = useState([])

  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  })
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()
    console.log("dataResponse", dataResponse)

    console.log(dataResponse)
    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }



  }

  useEffect(() => {
    fetchAllUsers()
  }, [])


  return (
    <div>
      <table className='w-full userTable  pb-4'>
        <thead>
          <tr className='bg-black text-white'>
            <th>SR.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{moment(user.createdAt).format('LL')}</td>
              <td>
                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                  onClick={() => {
                    setUpdateUserDetails(user)
                    setOpenUpdateRole(true)

                  }}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.username}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUser