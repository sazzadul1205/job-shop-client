import { useContext } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Providers/AuthProvider';
import TableRow from './TableRow';
import Loader from '../../Loader/Loader';

const MyBids = () => {
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    console.log(user.email);

    const getBids = async () => {
        const res = await axios.get(`/bids?bidderEmail=${user.email}`);
        return res;
    };

    const { data: bids, isError, isLoading } = useQuery({
        queryKey: ['jobs', user.email],
        queryFn: getBids,
    });
    if (isLoading) {
        return <div className='mx-auto justify-center'><Loader /></div>;
    }
    if (isError) {
        return <h1 className="text-center text-3xl font-bold text-red-900">Something Went Wrong</h1>;
    }
    const data = bids?.data;
    console.log(data);

    const handleComplete = (id) => {
        // Make the API call to update the status here
        console.log('Job marked as complete:', id);
    };

    return (
        <div>
            <div className="hero min-h-screen py-10 bg-[#2C74B3]">
                <div className="hero-content flex-col ">
                    <div>
                        <h1 className="text-3xl font-3xl italic text-center mb-5">~ My Bids ~</h1>
                        <p className='text-center'>My bids: {data?.length}</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Email</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Complete/In Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {data?.map((bid, index) => (
                                    <TableRow key={bid._id} bid={bid} index={index} handleComplete={handleComplete} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBids;
