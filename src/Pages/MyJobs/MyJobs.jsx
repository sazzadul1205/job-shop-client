import { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import MyJobCard from "./MyJobCard";
import { Helmet } from "react-helmet";
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
        return <h1 className="text-center text-3xl font-bold text-red-900">Something Went Wrong</h1>;
    }
    console.log(jobs?.data);
    const websiteName = 'Job Shop || My Jobs';
    return (
        <div className="bg-[#2C74B3] min-h-screen">
            <Helmet>
                <title>{websiteName}</title>
                <link rel="icon" type="image/png" href="/myjobs.png" />
            </Helmet>
            <h1 className="text-center text-3xl font bold pt-3">~ MyJobs ~</h1>
            <div className=" mt-5">
                {
                    jobs?.data.map(job => (
                        <MyJobCard
                            refetch={refetch}
                            key={job._id}
                            job={job}
                        ></MyJobCard>
                    ))
                }
            </div>
        </div>
    );
};

export default MyJobs;
