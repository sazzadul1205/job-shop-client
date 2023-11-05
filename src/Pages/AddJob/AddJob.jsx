import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const AddJob = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { user } = useContext(AuthContext)
    console.log(user?.email);

    const handleAddJob = (e) => {
        e.preventDefault();
        

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const title = form.get('title');
        const deadline = form.get('deadline');
        const category = form.get('category');
        const minPrice = form.get('minPrice');
        const maxPrice = form.get('maxPrice');
        const description = form.get('description');

        const job = {
            email,
            title,
            deadline,
            category,
            minPrice,
            maxPrice,
            description,
        };
        console.log(job);
        if (parseInt(minPrice) > parseInt(maxPrice)) {
            setIsButtonDisabled(true);
            console.log("Minimum price cannot be higher than maximum price");
        } else {
            setIsButtonDisabled(false);
            console.log(job);
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


    

    console.log(isButtonDisabled);
    return (
        <div>
            <div className="hero min-h-screen py-10 bg-[#2C74B3]">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-5xl font-3xl italic text-center mb-5"> Add Your Own Job</h1>
                        <p className="text-lg text-center">Welcome to our job posting platform. Whether you`re a business owner, a startup founder, or a hiring manager seeking skilled professionals, our Add Your Own Job feature makes it easy to showcase employment opportunities to a vast pool of talented individuals. Simply fill out the form above with your contact details and job specifications, and let us help you find the perfect candidate for your team. Join our platform today and streamline your recruitment process with efficiency and ease.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-[#144272] py-10 lg:mx-10">
                        <form onSubmit={handleAddJob} className="card-body px-10">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email of employer</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={user?.email}
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
                                    className="input input-bordered"
                                    onChange={handleDeadlineChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Job Category</span>
                                </label>
                                <select name="category" className="input input-bordered">
                                    <option value="">Select a category</option>
                                    <option value="web-Development">Web Development</option>
                                    <option value="digital-Marketing">Digital Marketing</option>
                                    <option value="graphics-Design">Graphics Design</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Minimum Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="minPrice"
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
                                    placeholder="Job Description"
                                    className="textarea textarea-bordered"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-[#2C74B3] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                                disabled={isButtonDisabled}
                            >
                                Add Job
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJob;
