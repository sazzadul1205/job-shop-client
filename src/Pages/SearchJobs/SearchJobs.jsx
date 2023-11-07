import { AiOutlineSearch } from "react-icons/ai";
import useAxios from '../../Hooks/useAxios';
import Loader from "../../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import JobCard from "../Home/Jobs/JobCard";
import { PiWarningCircleBold } from "react-icons/pi";

const SearchJobs = () => {
    const axios = useAxios();
    const [searchQuery, setSearchQuery] = useState("");
    const [title, setTitle] = useState(localStorage.getItem('searchTitle') || "");
    const [page, setPage] = useState(1);
    const limit = 9;

    const handleSearch = () => {
        setTitle(searchQuery);
        localStorage.setItem('searchTitle', searchQuery);
    };

    const getJobs = async () => {
        const res = await axios.get(`/jobs?page=${page}&limit=${limit}&title=${title || ' '}`);
        return res;
    };

    const { data: jobs, isError, isLoading } = useQuery({
        queryKey: ['jobs', title, page],
        queryFn: getJobs,
    });

    useEffect(() => {
        getJobs();
    }, [page, title]);

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

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < Math.ceil(jobs?.data?.length / limit)) {
            setPage(page + 1);
        }
    };

    const totalPages = Math.ceil(jobs?.data?.length / limit);

    return (
        <div>
            <div className="flex items-center justify-center py-5 bg-[#205295] relative">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input w-full max-w-xs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="p-3 bg-red-600 hover:bg-red-600 rounded-r-xl" onClick={handleSearch}>
                        <AiOutlineSearch />
                    </button>
                </div>
            </div>
            <div className="bg-[#205295]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 gap-5">
                    {jobs?.data.map(job => <JobCard key={job._id} job={job} />)}
                </div>
            </div>
            <div className="py-5 bg-[#205295] flex justify-center">
                <div className="join border-2">
                    <button onClick={handlePrevious} className="join-item btn btn-ghost bg-blue-800">«</button>
                    {Array(totalPages).fill(0).map((item, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`${pageNumber === page ? 'join-item btn btn-ghost bg-blue-400' : 'join-item btn btn-ghost bg-blue-800'}`}
                            >{pageNumber}</button>
                        );
                    })}
                    <button onClick={handleNext} className="join-item btn btn-ghost bg-blue-800">»</button>
                </div>
            </div>
        </div>
    );
};

export default SearchJobs;
