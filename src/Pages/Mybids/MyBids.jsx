import TableRow from './TableRow';
import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Providers/AuthProvider';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

const MyBids = () => {
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    console.log(user.email);

    const getBids = async () => {
        const res = await axios.get(`/bids?bidderEmail=${user?.email}`);
        return res;
    };

    const { data: bids, isError, isLoading } = useQuery({
        queryKey: ['bids', user.email, status],
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

    const handleComplete = async (id, updatedStatus) => {
        console.log('Job marked as complete:', id);
        console.log(updatedStatus);

        const res = await axios.put(`/bids/${id}`, updatedStatus);
        console.log('Bid successfully sent', res?.data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your job has been successfully updated.',
            })
        }
    };
    const websiteName = 'Job Shop || My Bids';
    return (
        <div>
            <Helmet>
                <title>{websiteName}</title>
                <link rel="icon" type="image/png" href={'https://i.ibb.co/XpcBgCh/myBid.png'} />
            </Helmet>
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
