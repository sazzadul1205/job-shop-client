import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register"
import AddJob from "../Pages/AddJob/AddJob";
import JobDetails from "../Pages/JobDetails/JobDetails";


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
            },
            {
                path: '/addJob',
                element: <AddJob></AddJob>
            },
            {
                path:'/jobDetails/:id',
                element: <JobDetails></JobDetails>,
                loader:({params}) => fetch(`http://localhost:5000/api/v1/jobs/${params.id}`)
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
]);

export default router