import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
    const { _id, title, deadline, description, maxPrice, minPrice } = job;

    return (
        <>
            <motion.div
                className="max-w-md mx-auto bg-[#144272] rounded-xl shadow-md overflow-hidden m-4 text-left"
                whileHover={{ scale: [null, 1.2, 1.2] }}
                transition={{ duration: 0.3 }}
            >
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
                        {title}
                    </div>
                    <p className="text-black font-bold text-sm mb-2">Job Deadline: {deadline}</p>
                    <p className="text-black font-bold text-sm mb-4">
                        Price Range: ${minPrice} - ${maxPrice}
                    </p>
                    <p className="text-whi text-base">{description}</p>
                    <div className="mt-6">
                        <Link to={`/jobDetails/${_id}`}>
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-blue-500 hover:bg-[#2C74B3] text-white font-bold py-2 px-8 rounded-xl"
                            >
                                Bid Now
                            </motion.button>
                        </Link>
                    </div>
                </div>

            </motion.div>
        </>
    );
};

export default JobCard;
