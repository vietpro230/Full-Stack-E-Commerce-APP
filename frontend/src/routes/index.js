import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUser";

import AllProduct from "../pages/AllProduct";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <SignUp />
            },


            {
                path: "product-category",
                element: <CategoryProduct />,
            },

            // {
            //     path : "product-category/:categoryName",
            //     element : <CategoryProduct />
            // },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children : [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-product",
                        element: <AllProduct />
                    }
                ]
            },

            {
                path: "product/:id",
                element: <ProductDetails />

            },
            {
                path: "cart",
                element: <Cart />

            },
            {
                path: "search",
                element: <SearchProduct/>

            }
            
            
        ]

    }

])

export default router