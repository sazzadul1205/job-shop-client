import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, singIn, signInWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(null);



    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        singIn(email, password)
            .then(res => {
                console.log(res.user);
                navigate(location?.state ? location.state : '/')
                const user = {
                    email: email,
                    lastLoggedAt: res.user?.metadata?.lastSignInTime,
                };
                console.log(user);
            })
            .catch(error => {
                console.error(error);
                setLoginError("Invalid email or password. Please try again.");
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid email or password. Please try again.'
                });

            })

    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                console.log(res.user);
                navigate(location?.state ? location.state : '/');

            })
            .catch(error => {
                console.error(error);
                setLoginError("Google sign-in error. Please try again.");
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Google sign-in error. Please try again.'
                });

            });
    }
    console.log(user);

    return (
        <div>
            <div className="hero min-h-screen py-10 bg-[#2C74B3]">
                <div className="hero-content flex-col">
                    <div >
                        <img className="w-50 mx-auto" src={'https://i.ibb.co/QKSVWrJ/head-icon.png'} alt="https://i.ibb.co/QKSVWrJ/head-icon.png" />

                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-[#144272] py-10 lg:mx-10">
                        <form onSubmit={handleLogin} className="card-body px-10">
                            <h1 className="text-5xl font-bold text-center">Please Log In</h1>
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
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {loginError && (
                                <div className="text-red-500 mt-2 text-center">
                                    {loginError}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-[#2C74B3] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                                LogIn
                            </button>
                            <h1 className='font-normal text-sm'>Don`t Have an account? <span className='text-[#FF3811]'><Link to={'/signUp'}>Sign Up</Link></span></h1>
                        </form>
                        <div className="flex items-center space-x-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="text-xl">or</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <h2 className="text-center font-extrabold mb-2">Login With</h2>
                        <div className="flex justify-center">
                            <button onClick={handleGoogleSignIn} className="btn btn-outline w-1/2"><FcGoogle></FcGoogle>Google</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;