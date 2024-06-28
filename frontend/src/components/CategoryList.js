import React from 'react'
import SummaryApi from '../common'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categogyProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categoryProductLoad = new Array(10).fill(null)


    const fetchCategoryProduct = async () => {
        setLoading(true)
        const respone = await fetch(SummaryApi.categogyProduct.url)
        const datarespon = await respone.json()
        setLoading(false)
        setCategoryProduct(datarespon.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])


    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {
            loading?(
                categoryProductLoad.map((item, index) => {
                    return (
                        <div className='w-16 h-16 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
                           
                        </div>
                    )
                })
            
            ):(
                    categogyProduct.map((item, index) => {
                        return (
                            <Link to={"/product-category?category="+item?.category} className='cursor-pointer' key={item?.category}>
                                <div className='w-16 h-16 rounded-full overflow-hidden p-4 flex bg-slate-200 items-cente justify-center'>
                                    <img src={item.productImage[0]} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{item?.category}</p>
                            </Link>
                        )
                    }))



                }
            </div>
        </div>
    )
}

export default CategoryList