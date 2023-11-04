import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register"


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
]);

export default router