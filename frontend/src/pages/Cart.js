import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from 'react-icons/md'
import { current } from '@reduxjs/toolkit'

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)
  const fetchData = async () => {
    //setLoading(true)
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })
    //setLoading(false)


    const responseData = await response.json()

    if (responseData.success) {
      setData(responseData.data)
    }


  }

  const handleLoading = async () => {
    await fetchData()
  }

  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
  }, [])


  const increaseQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          _id: id,
          quantity: qty + 1
        }
      )
    })

    const responseData = await response.json()


    if (responseData.success) {
      fetchData()
    }
  }


  const decraseQuantity = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(
          {
            _id: id,
            quantity: qty - 1
          }
        )
      })

      const responseData = await response.json()


      if (responseData.success) {
        fetchData()
      }
    }
  }

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          _id: id,
        }
      )
    })

    const responseData = await response.json()

    if (responseData.success) {
      fetchData()
      context.fetchUserAddToCart()
    }
  }



  const totalQuantity = data.reduce((prev, current) => prev + current.quantity, 0)
  const totalPrice = data.reduce((prev, current) => prev + (current.productId.selling * current.quantity),0)
  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && !loading && <h1>Cart is empty</h1>
        }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* view product */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map(el => {
                return (
                  <div key={el + "Add to card loading "} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                  </div>
                )
              })

            ) : (
              data.map((product, index) => {
                return (
                  <div key={product?.id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                    </div>

                    <div className='px-4 py-2 relative'>
                      {/* delete product */}
                      <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                        <MdDelete />
                      </div>
                      <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                      <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId?.selling)}</p>
                      <div className='flex items-center gap-3'>
                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center'
                          onClick={() => decraseQuantity(product?._id, product?.quantity)}
                        >-</button>
                        <span className='px-2'>{product?.quantity}</span>
                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center'
                          onClick={() => increaseQuantity(product?._id, product?.quantity)}
                        >+</button>
                      </div>
                    </div>

                  </div>
                )
              })
            )
          }
        </div>

        {/*summary*/}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div>
                <div className='flex justify-between'>
                  <h1 className='w-full bg-slate-200 rounded'></h1>
                </div>
                <button className='w-full bg-slate-200 text-white py-2 rounded mt-2'></button>
              </div>


            ) : (
              <div className='h-36 bg-white'>
                <h2 className='text-white bg-blue-500 px-4 py-1 rounded'>Summary</h2>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Quantity</p>
                  <p>{totalQuantity}</p>
                </div>

                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Total Price</p>
                  <p>{displayCurrency(totalPrice)}</p>
                </div>

                <button className='bg-blue-600 p-2 text-white w-full mt-2 rounded'>Payment</button>

              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Cart