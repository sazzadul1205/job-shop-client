import { useContext } from "react";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import MyJobCard from "./MyJobCard";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
document.title = 'Job Shop || My Jobs'

const MyJobs = () => {
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    console.log(user?.email);

    const getJobs = async () => {
        const res = await axios.get(`/jobs?email=${user?.email}`);
        return res;
    };

    const { data: jobs, isError, isLoading, refetch } = useQuery({
        queryKey: ['jobs', user?.email],
        queryFn: getJobs,
    });

    if (isLoading) {
        return <div className='mx-auto justify-center'><Loader /></div>;
    }
    if (isError) {
        return (
            <div className='py-10 bg-[#205295]'>
                    <PiWarningCircleBold className="mx-auto text-8xl"></PiWarningCircleBold>
                    <p className='text-center text-3xl font-bold text-red-900 italic'>Oops!</p>
                    <h1 className="text-center text-3xl font-bold text-red-900 italic">Something Went Wrong</h1>
                </div>
        );
    }
    console.log(jobs?.data);
    const websiteName = 'Job Shop || My Jobs';
    return (
        <div className="bg-[#2C74B3] min-h-screen">
            <Helmet>
                <title>{websiteName}</title>
                <link rel="icon" type="image/png" href={'https://i.ibb.co/6HvkMv7/myjobs.png'} />
            </Helmet>
            <h1 className="text-center text-3xl font-bold pt-3">~ MyJobs ~</h1>
            <div className=" mt-5">
                {jobs?.data.length ? (
                    jobs?.data.map(job => (
                        <MyJobCard
                            refetch={refetch}
                            key={job._id}
                            job={job}
                        ></MyJobCard>
                    ))
                ) : (
                    <div className="text-center my-8">
                        <p className="text-2xl font-semibold text-gray-800">You do not have any jobs yet.</p>
                        <p className="text-lg text-gray-600 mt-4">Start by adding new jobs now!</p>
                        <Link to="/addJob">
                            <motion.button
                                whileHover={{ scale: 1.4 }}
                                whileTap={{ scale: 0.9 }}
                                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
                            >
                                Add New Job
                            </motion.button>
                        </Link>

                    </div>

                )}
            </div>
        </div>
    );
};

export default MyJobs;
