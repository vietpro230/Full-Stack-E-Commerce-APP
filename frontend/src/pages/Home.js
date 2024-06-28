import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProdcut from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='bg-slate-100'>
      <CategoryList />
      <BannerProduct/>


      <HorizontalCardProduct category = {"Airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category = {"Camera"} heading={"Popular camera"} />

      <VerticalCardProdcut category = {"Mobiles"} heading={"Top's mobile"} />
      
    </div>
  )
}

export default Home