import { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import MyJobCard from "./MyJobCard";
import UpdateJobs from "../UpdateJobs/UpdateJobs";

const MyJobs = () => {
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    console.log(user?.email);

    const getJobs = async () => {
        const res = await axios.get(`/jobs?email=${user?.email}`);
        return res;
    };

    // const handleEdit = (id) => {
    //     console.log(`Edit button clicked for job with ID: ${id}`);
    //     <UpdateJobs key={id}>{id}</UpdateJobs>
    // };

    const handleDelete = (id) => {
        console.log(`Delete button clicked for job with ID: ${id}`);
    };

    const { data: jobs, isError, isLoading } = useQuery({
        queryKey: ['jobs', user?.email],
        queryFn: getJobs,
    });

    if (isLoading) {
        return <div className='mx-auto justify-center'><Loader /></div>;
    }
    if (isError) {
        return <h1 className="text-center text-3xl font-bold text-red-900">Something Went Wrong</h1>;
    }
    console.log(jobs?.data);

    return (
        <div className="bg-[#2C74B3] min-h-screen">
            <h1 className="text-center text-3xl font bold pt-3">~ MyJobs ~</h1>
            <div className=" mt-5">
                {
                    jobs?.data.map(job => (
                        <MyJobCard
                            key={job._id}
                            job={job}
                            onDelete={() => handleDelete(job._id)}
                        ></MyJobCard>
                    ))
                }
            </div>
        </div>
    );
};

export default MyJobs;
