import { Link } from "react-router-dom";

const Register = () => {

    




    return (
        <div>
            <div className="hero min-h-screen py-10 bg-[#2C74B3]">
                <div className="hero-content flex-col">
                    <div >
                        <img className="w-50 mx-auto" src={'https://i.ibb.co/QKSVWrJ/head-icon.png'} alt="https://i.ibb.co/QKSVWrJ/head-icon.png" />

                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-[#144272] py-10 lg:mx-10">
                        <form className="card-body px-10">
                            <h1 className="text-2xl md:text-5xl font-bold text-center">Please Log In</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                type="password" 
                                name="password" 
                                placeholder="password" 
                                className="input input-bordered" 
                                required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Url</span>
                                </label>
                                <input 
                                type="url" 
                                name="Image" 
                                placeholder="Image Url" 
                                className="input input-bordered" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#2C74B3] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-10">
                                Sign Up
                            </button>
                            <h1 className='font-normal text-sm'>Already Have an account? <span className='text-[#FF3811]'><Link to={'/login'}>Login</Link></span></h1>
                        </form>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;