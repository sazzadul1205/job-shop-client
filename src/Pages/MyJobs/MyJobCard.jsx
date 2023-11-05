import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const MyJobCard = ({ job, onDelete }) => {
    const { _id, title, deadline, description, maxPrice, minPrice } = job;
    return (
        <div className="m-10 p-6 bg-blue-800 rounded-xl flex justify-between items-center text-white">
            <div className="flex-1">
                <h1 className="text-3xl font-extrabold mb-4 text-[#2C74B3]">{title}</h1>
                <h1 className="text-lg font-semibold text-gray-400">Deadline: {deadline}</h1>
                <p className="text-sm text-gray-300 mt-2">Price Range: {maxPrice} - {minPrice}</p>
                <p className="py-6 text-md">{description}</p>
            </div>
            <div className="flex flex-col gap-4">
                <Link to={`/updateJobs/${_id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded flex items-center">
                        <AiOutlineEdit className="mr-2" /> Edit
                    </button>
                </Link>
                <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded flex items-center" onClick={() => onDelete(_id)}>
                    <AiOutlineDelete className="mr-2" /> Delete
                </button>
            </div>
        </div>
    );
};

export default MyJobCard;
