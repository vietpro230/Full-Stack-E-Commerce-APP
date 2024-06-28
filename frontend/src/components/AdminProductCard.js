import React from "react"
import { MdModeEdit } from "react-icons/md"
import AdminEditProduct from "./AdminEditProduct"
import { useState } from "react"
import displayCurrency from "../helpers/displayCurrency"

const AdminProductCard = ({
    data,
    fetchdata
}) => {

    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className="bg-white p-4 rounded">
            <div className="w-32 h-32 flex justify-center items-center">
                <img src= {data?.productImage[0]}
                className="mx-auto object-fill h-full"
                />
            </div>
            <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
            <div className="font-semibold">
                    {
                        displayCurrency(data.price)
                    }
            </div>


            <div className="w-fit ml-auto p-2  bg-green-100 hover:bg-green-500 rounded-full hover:text-white cursor-pointer" 
                onClick={()=>setEditProduct(true)}>
                <MdModeEdit/>
            </div>


            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchdata}/>
                )
            }


        </div>


    )
}


export default AdminProductCard