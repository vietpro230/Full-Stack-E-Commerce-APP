import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import addToCart from '../helpers/addToCard'
import { Link } from 'react-router-dom'
import Context from '../context'

const VerticalCardProdcut = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef(null)

  
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()

  }

  const fetchData = async () => {
    setLoading(true)

    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
    console.log(categoryProduct)
  }


  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }




  useEffect(() => {
    fetchData()
  }, []) 
  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block ' onClick={scrollLeft}><FaAngleLeft/></button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block ' onClick={scrollRight}><FaAngleRight/></button>

        {
          loading ? (loadingList.map((product, index) => {
            
              return (
                <div className='w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                  <div className='bg-slate-200 h-48 flex justify-center items-center p-4 min-w-[120px] md:min-w-[145px]  animate-pulse '>
                  </div>
  
                  <div className='p-4 grid gap-3'>
                              <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                              <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                              <div className='flex gap-3'>
                                  <p className='text-red-600 font-medium p-1  animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                  <p className='text-slate-500 line-through p1  animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                              </div>
                              <button className='text-sm text-white px-3 rounded-full bg-slate-200  py-2 animate-pulse'></button>
                          </div>
                </div>
              )
            



          })) : (
            data.map((product, index) => {
              return (
                <Link to={"product/" + product?._id}  className='w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                  <div className='bg-slate-200 h-48 flex justify-center items-center p-4 min-w-[120px] md:min-w-[145px] '>
                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                  </div>
  
                  <div className='p-4 grid gap-2 w-full'>
                              <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                              <p className='capitalize text-slate-500'>{product?.category}</p>
                              <div className='flex gap-3 w-full'>
                                  <p className='text-red-600 font-medium '>{ displayINRCurrency(product?.selling) }</p>
                                  <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
                              </div>
                              <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'  onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                          </div>
                </Link>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default VerticalCardProdcut