import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
document.title= 'Job Shop || Job Details'

const JobDetails = () => {
    const axios = useAxios();
    const services = useLoaderData();
    const { user } = useContext(AuthContext);
    const { email, title, deadline, description, maxPrice, minPrice } = services;

    const [isSameEmail, setIsSameEmail] = useState(user.email === email);

    const handleBidSubmission = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const Bid = form.get('Bid');
        const bidderDeadline = form.get('bidderDeadline');
        const status = 'In Progress'

        const bid = {
            Bid,
            bidderDeadline,
            bidderEmail: user?.email,
            sellerEmail: email,
            title,
            maxPrice,
            minPrice,
            status,
        };
        console.log(bid);
        const res = await axios.post('/bids/add-new-bid', bid);
        console.log('Bid successfully sent', res?.data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your bid has been successfully submitted.',
            });
        }
    };

    return (
        <div className='bg-[#2C74B3]'>
            <h1 className='text-center text-3xl font-bold italic pt-5'>~ Give your Bid ~</h1>
            {isSameEmail && (
                <p className='text-[#2C74B3] bg-[#fa0a0a] text-center justify-center'>You can not bid on your own project</p>
            )}
            <div className=" flex flex-col lg:flex-row min-h-screen py-10 ">

                <div className=" my-auto bg-[#144272] rounded-xl shadow-md overflow-hidden m-4 text-left">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
                            {title}
                        </div>
                        <p className="text-gray-500 text-sm mb-2">Job Deadline: {deadline}</p>
                        <p className="text-gray-500 text-sm mb-4">
                            Price Range: ${minPrice} - ${maxPrice}
                        </p>
                        <p className="text-gray-700 text-base">{description}</p>
                    </div>
                </div>

                <div className="hero ">
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-[#144272] py-10 lg:mx-10">
                        <form className="card-body px-10" onSubmit={handleBidSubmission}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bid Amount</span>
                                </label>
                                <input
                                    type="number"
                                    name="Bid"
                                    placeholder="Bid Amount"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                </label>
                                <input
                                    type="date"
                                    name="bidderDeadline"
                                    placeholder="Job Title"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input
                                    type="bidderEmail"
                                    name="email"
                                    defaultValue={user.email}
                                    placeholder="Job Deadline"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Seller Email</span>
                                </label>
                                <input
                                    type="sellerEmail"
                                    name="email"
                                    defaultValue={email}
                                    placeholder="Job Deadline"
                                    className="input input-bordered"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-[#2C74B3] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ${isSameEmail ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                                disabled={isSameEmail}
                            >
                                {isSameEmail ? "Cannot Bid" : "Bid"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
