import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import { useState } from 'react'
import SummaryApi from '../common'
import { useNavigate } from 'react-router-dom'


const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectedCategory, setSelectedCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])


  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    }
    )

    const dataResponse = await response.json()
    //console.log("dataResponse", dataResponse)
    setData(dataResponse?.data || [])

  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectedCategory((prev) => {
      return {
        ...prev,
        [value]: checked

      }

    }
    )
  }
  //console.log("selectedCategory", selectedCategory)

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectedCategory).map((categoryName) => {
      if (selectedCategory[categoryName]) {
        return categoryName
      }
      return null
    }).filter((el => el))

    setFilterCategoryList(arrayOfCategory)
    // console.log("arrayOfCategory", arrayOfCategory)
    const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length-1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`

      }
    )
    navigate("/product-category?"+urlFormat.join(""))
  }, [selectedCategory])

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)
    if(value === "ascending"){
      setData((prev) => prev.sort((a,b) => a.selling - b.selling))
    }
    if(value === "descending"){
      setData((prev) => prev.sort((a,b) => b.selling - a.selling))
    }
  }

  useEffect(() => {
  }, [sortBy])


  return (
    <div className='container mx-auto p-4'>
      {/* desktop version  */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side  */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px] overflow-y-scroll'>
          {/*sort by  */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'ascending'} value={"ascending"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'descending'} value={"descending"} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* filter by category  */
            <div>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName, index) => (
                    <div className='flex items-center gap-3'>
                      <input type='checkbox' name='category' id={categoryName?.value} checked={selectedCategory[categoryName?.value]} value={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName.label}</label>
                    </div>
                  ))
                }
              </form>
            </div>}

        </div>
        {/* right side  */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>

      {/* mobile version  */}
    </div>
  )
}

export default CategoryProduct