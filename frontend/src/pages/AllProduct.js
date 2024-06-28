import React from 'react'
import UploadProduct from '../components/UploadProduct'
import { useState } from 'react'
import { useEffect } from 'react'
import SummaryApi from '../common/index'
import AdminProductCard from '../components/AdminProductCard'



const AllProduct = () => {
  const [isUpLoadProduct, setIsUpLoadProduct] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getProducts.url)
      const dataResponse = await response.json()
    
      setAllProducts(dataResponse?.data || [])
    }
    catch (error) {
      console.log(error.message || error)
    }
  }


  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div>
      <div className='flex justify-between bg-slate-300 px-2 py-4 items-center'>
        <h2 className='font-bold text-lg'>Products</h2>
        <button className='border-2 border-yellow-500 py-1 px-3 rounded-lg text-yellow-500 hover:bg-yellow-500 hover:text-white'
          onClick={() => setIsUpLoadProduct(true)}>Add Product</button>
      </div>

      <div className='bg-slate-200 flex flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProducts.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProducts} />
                
              )
            })
          }
        </div>



      {
        isUpLoadProduct && (
          <UploadProduct onClose={() => setIsUpLoadProduct(false)} fetchData={fetchAllProducts} />
        )
      }

    </div>
  )
}

export default AllProduct