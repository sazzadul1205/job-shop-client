import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register"
import AddJob from "../Pages/AddJob/AddJob";
import JobDetails from "../Pages/JobDetails/JobDetails";
import MyJobs from "../Pages/MyJobs/MyJobs";
import UpdateJobs from "../Pages/UpdateJobs/UpdateJobs";
import MyBids from "../Pages/MyBids/MyBids";
import PrivateRoutes from "./PrivateRoutes";
import BidRequest from "../Pages/BidRequest/BidRequest";
import SearchJobs from "../Pages/SearchJobs/SearchJobs";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
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
                element: <PrivateRoutes><AddJob></AddJob></PrivateRoutes>
            },
            {
                path: '/jobDetails/:id',
                element: <PrivateRoutes><JobDetails></JobDetails></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://job-shop-server.vercel.app/api/v1/jobs/${params.id}`)
            },
            {
                path: '/myJobs',
                element: <PrivateRoutes><MyJobs></MyJobs></PrivateRoutes>
            },
            {
                path: '/updateJobs/:id',
                element: <PrivateRoutes><UpdateJobs></UpdateJobs></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://job-shop-server.vercel.app/api/v1/jobs/${params.id}`)
            },
            {
                path: '/myBids',
                element: <PrivateRoutes><MyBids></MyBids></PrivateRoutes>
                
            },
            {
                path: '/bidRequest',
                element: <PrivateRoutes><BidRequest></BidRequest></PrivateRoutes>
                
            },
            {
                path: '/searchJobs',
                element: <PrivateRoutes><SearchJobs></SearchJobs></PrivateRoutes>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
]);

export default router