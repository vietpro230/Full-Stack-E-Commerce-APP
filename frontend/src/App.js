import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context'
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useState } from 'react';


function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0) 
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    })
    const dataAPI = await dataResponse.json();

   // console.log("dataAPI2", dataAPI.data);
    if(dataAPI.success){
      dispatch(setUserDetails(dataAPI.data));
    }

  
  
  }
  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
    setCartProductCount(dataApi?.data?.count)
    // console.log("dataApi", dataApi);
  }
  
  useEffect(() => {
    fetchUserDetails()
    fetchUserAddToCart()

  }, [])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails,
      cartProductCount,
      fetchUserAddToCart
      }}>
      <ToastContainer
        position='top-center'
      />
      <Header />
      <main className='min-h-[calc(100vh-102px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
