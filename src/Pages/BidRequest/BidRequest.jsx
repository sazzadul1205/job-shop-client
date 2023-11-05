import { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import BidRequestRow from "./BidRequestRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BidRequest = () => {
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    console.log(user.email);

    const getBids = async () => {
        const res = await axios.get(`/bids?sellerEmail=${user?.email}`);
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

    const handleReject = async (id, updatedBid) => {
        console.log('Reject clicked for bid with ID:', id);
        console.log(updatedBid);
        const res = await axios.put(`/bids/${id}`, updatedBid);
        console.log('Bid rejected:', res?.data);

        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Bid Rejected!',
                text: 'The bid has been successfully rejected.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again.',
            });
        }
    };
    
    const handleAccept = async (id, updatedBid) => {
        console.log('Reject clicked for bid with ID:', id);
        console.log(updatedBid);
        const res = await axios.put(`/bids/${id}`, updatedBid);
        console.log('Bid rejected:', res?.data);

        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Bid Rejected!',
                text: 'The bid has been successfully Accepted.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    const websiteName = 'Job Shop || Bid Request';
    return (
        <div>
            <Helmet>
                <title>{websiteName}</title>
                <link rel="icon" type="image/png" href="../../../public/bidRequest.jpeg" />
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
                                    <th>price</th>
                                    <th>status</th>
                                    <th>Accept</th>
                                    <th>Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((bid, index) => (
                                    <BidRequestRow key={bid._id} bid={bid} index={index} handleReject={handleReject} handleAccept={handleAccept} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BidRequest;
