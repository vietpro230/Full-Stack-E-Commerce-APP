import React from 'react'
import { CgClose } from 'react-icons/cg'
import { useState } from 'react'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import { MdDelete } from 'react-icons/md'
import SummaryApi from '../common'
import {toast} from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData

}
) => {


    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        price: "",
        selling: "",

    })


    const [fullScreenImage, setFullScreenImage] = useState("")
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })

    }



    const handleDeleteProductImage = async(index) => {
        const newProcductImage = [...data.productImage]
        newProcductImage.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
                productImage: newProcductImage
            }
        })


    }



    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const response = await fetch(SummaryApi.uploadProduct.url,{
          method : SummaryApi.uploadProduct.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
    
        const responseData = await response.json()
    
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
            console.log("geted data from backend")
        }
    
    
        if(responseData.error){
          toast.error(responseData?.message)
        }
      
    
      }

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg'>UploadProduct</h2>
                    <button onClick={onClose}>
                        <CgClose />
                    </button>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'
                onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='productName'  className='text-sm'>Product Name</label>
                        <input type='text' placeholder='Product Name' className='border p-2'
                            name='productName'
                            value={data.productName}
                            onChange={handleOnChange}
                        />
                        <label htmlFor='brandName'  className='text-sm'>Brand Name</label>
                        <input type='text' placeholder='Brand Name' className='border p-2'
                            name='brandName'
                            value={data.brandName}
                            onChange={handleOnChange}
                        />

                        <label htmlFor='category'  className='text-sm'>Category</label>
                        <select className='p-2 bg-slate-100 border rounded'
                            required value={data.category}
                            name="category"
                            onChange={handleOnChange}>

                            <option value=''>Select Category</option>
                            {productCategory.map((item) => (
                                <option key={item.id} value={item.value}>{item.label}</option>
                            ))}
                        </select>


                        <label htmlFor='productImage' className='flex flex-col items-center gap-2 hover:cursor-pointer'>
                            <div className='p-2 bg-slate-200 border rounded h-32 w-full flex justify-center items-center flex-col '>

                                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                    <span className='text-4xl'><FaCloudUploadAlt /></span>
                                    <p className='text-sm'>Upload Prodcut Image</p>
                                    <input type='file' id='productImage' className='hidden' onChange={handleUploadProduct} />
                                </div>
                            </div>
                        </label>

                        <div>

                            {
                                data?.productImage[0] ? (
                                    <div className='flex items-center gap-2'>
                                        {
                                            data.productImage.map((image,index) => {
                                                return (
                                                    <div className='relative group'>
                                                        <img
                                                            src={image}
                                                            width={80}
                                                            height={80}
                                                            className='bg-slate-100 border cursor-pointer'
                                                            onClick={() => { setOpenFullScreenImage(true); setFullScreenImage(image) }}
                                                        />

                                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                                        onClick={()=>handleDeleteProductImage(index)} >
                                                            <MdDelete />
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <p className='text-red-600 text-xs'>*Please upload product image</p>
                                )
                            }


                        </div>



                        <label htmlFor='price' className='text-sm'>Price</label>
                        <input type='number' placeholder='Price' className='border p-2'
                            name='price'
                            value={data.price}
                            onChange={handleOnChange}
                            required />
                        <label htmlFor='selling' className='text-sm'>Selling</label>
                        <input type='number' placeholder='Selling' className='border p-2'
                            name='selling'
                            value={data.selling}
                            onChange={handleOnChange} 
                            required />
                        <textarea placeholder='Description' className='h-28 bg-slate-100 resize-none border p-2' 
                        onChange={handleOnChange}
                        name='description'
                        required
                          rows= {3}></textarea>
                    </div>
                    <button className='bg-slate-700 text-white p-2 rounded mt-4' type='submit'
                   
                    >Upload Product</button>
                </form>

            </div >

            {
                openFullScreenImage && (
                    <DisplayImage
                        onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage}
                    />
                )

            }
        </div >
    )
}

export default UploadProduct