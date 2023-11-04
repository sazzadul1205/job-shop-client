import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const axios = useAxios()

    const handleRegister = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        const displayName = form.get("name");
        const photoURL = form.get("image");

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Password must be at least 6 characters long'
            });
            return;
        } else {
            setPasswordError('');
        }

        createUser(email, password)
            .then((res) => {
                console.log(res.user.email);
                axios.post('/auth/access-token', { email: res.user.email })
                    .then(tokenResponse => {
                        const token = tokenResponse.data;
                        navigate(location?.state ? location.state : '/')
                        console.log(token);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Login successful!',
                        });
                    })
                    .catch(tokenError => {
                        console.error(tokenError);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to generate access token. Please try again.',
                        });
                    });
                updateUser(displayName, photoURL)
                    .then(updateResponse => {
                        // console.log(res);
                        navigate(location?.state ? location.state : "/");
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            text: 'You have successfully registered an account!',
                        });
                    })
                    .catch(updateError => {
                        console.error(updateError);
                        let updateErrorMessage = updateError.message;

                        Swal.fire({
                            icon: 'error',
                            title: 'Registration Failed',
                            text: updateErrorMessage,
                        });
                    });
            })
            .catch((error) => {
                console.error('Error in registration:', error);
                let errorMessage = error.message;

                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: errorMessage,
                });
            });
    };





    return (
        <div>
            <div className="hero min-h-screen py-10 bg-[#2C74B3]">
                <div className="hero-content flex-col">
                    <div >
                        <img className="w-50 mx-auto" src={'https://i.ibb.co/QKSVWrJ/head-icon.png'} alt="https://i.ibb.co/QKSVWrJ/head-icon.png" />

                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-[#144272] py-10 lg:mx-20">
                        <form onSubmit={handleRegister} className="card-body px-10">
                            <h1 className="text-2xl md:text-5xl font-bold text-center">Sign Up</h1>
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
                            {passwordError && (
                                <div className="text-red-500">
                                    {passwordError}
                                </div>
                            )}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Url</span>
                                </label>
                                <input
                                    type="url"
                                    name="image"
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