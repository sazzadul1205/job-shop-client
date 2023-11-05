import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const { _id, title, deadline, description, maxPrice, minPrice } = job;

    return (
        <div className="max-w-md mx-auto bg-[#144272] rounded-xl shadow-md overflow-hidden m-4 text-left">
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
                    {title}
                </div>
                <p className="text-gray-500 text-sm mb-2">Job Deadline: {deadline}</p>
                <p className="text-gray-500 text-sm mb-4">
                    Price Range: ${minPrice} - ${maxPrice}
                </p>
                <p className="text-gray-700 text-base">{description}</p>
                <div className="mt-6">
                    <Link to={`/jobDetails/${_id}`}>
                        <button className="bg-blue-500 hover:bg-[#2C74B3] text-white font-bold py-2 px-8 rounded">
                            Bid Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
