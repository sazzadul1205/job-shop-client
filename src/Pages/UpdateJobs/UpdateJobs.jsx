import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet";
document.title= 'Job Shop || Update Jobs'

const UpdateJobs = () => {
    const job = useLoaderData()
    const axios = useAxios();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { _id, email, title, deadline, category, description, maxPrice, minPrice } = job;

    const handleUpdatedJob = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const updatedEmail = form.get('email');
        const updatedTitle = form.get('title');
        const updatedDeadline = form.get('deadline');
        const updatedCategory = form.get('category');
        const updatedMinPrice = form.get('minPrice');
        const updatedMaxPrice = form.get('maxPrice');
        const updateDescription = form.get('description');

        const updatedJob = {
            email: updatedEmail,
            title: updatedTitle,
            deadline: updatedDeadline,
            category: updatedCategory,
            minPrice: updatedMinPrice,
            maxPrice: updatedMaxPrice,
            description: updateDescription,
        };



        console.log(updatedJob);
        if (parseInt(minPrice) > parseInt(maxPrice)) {
            setIsButtonDisabled(true);
            console.log("Minimum price cannot be higher than maximum price");
        } else {
            setIsButtonDisabled(false);
        }

        const res = await axios.put(`/jobs/${_id}`, updatedJob);
        console.log('Bid successfully sent', res?.data);
        if (res.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your job has been successfully updated.',
            }).then(() => {
                history.goBack();
            });
        }
    };

    const handleDeadlineChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        const isPastDate = selectedDate <= currentDate;
        const isCurrentDate = selectedDate === currentDate;
        setIsButtonDisabled(isPastDate || isCurrentDate);
    };


    const handlePriceChange = (e) => {
        const form = new FormData(e.currentTarget.form);
        const minPrice = parseInt(form.get('minPrice'));
        const maxPrice = parseInt(form.get('maxPrice'));

        if (minPrice > maxPrice) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    };


    const websiteName = 'Job Shop || Update Jobs';
    return (
        <div>
            <Helmet>
                <title>{websiteName}</title>
                <link rel="icon" type="image/png" href={'https://i.ibb.co/MDdY4Dj/update-Jobs.webp'} />
            </Helmet>
            <div className="hero min-h-screen py-10 bg-[#2C74B3]">
                <div className="hero-content flex-col ">
                    <div>
                        <h1 className="text-5xl font-3xl italic text-center mb-5"> Update Job</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-[#144272] py-10 lg:mx-10">
                        <form onSubmit={handleUpdatedJob} className="card-body px-10">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email of employer</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={email}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Job Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={title}
                                    placeholder="Job Title"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Job Deadline</span>
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    placeholder="Job Deadline"
                                    defaultValue={deadline}
                                    className="input input-bordered"
                                    onChange={handleDeadlineChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Job Category</span>
                                </label>
                                <select name="category" defaultValue={category} className="input input-bordered">
                                    <option value="">Select a category</option>
                                    <option value="Web-Development">Web Development</option>
                                    <option value="Digital-Marketing">Digital Marketing</option>
                                    <option value="Graphics-Design">Graphics Design</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Minimum Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="minPrice"
                                    defaultValue={minPrice}
                                    placeholder="Job Minimum Price"
                                    className="input input-bordered"
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Maximum Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    defaultValue={maxPrice}
                                    placeholder="Job Maximum Price"
                                    className="input input-bordered"
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Job Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={description}
                                    placeholder="Job Description"
                                    className="textarea textarea-bordered"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-[#2C74B3] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                                disabled={isButtonDisabled}
                            >
                                Update Job
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateJobs;
