import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";



const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("User signed out successfully.");
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
    };

    const links = (
        <>
            <>
                <li className="text-md"><NavLink to={'/'}>Home</NavLink></li>
                <li className="text-md"><NavLink to={'/addJob'}>Add Job</NavLink></li>
                <li className="text-md"><NavLink to={'/myJobs'}>My Posted job</NavLink></li>
                <li className="text-md"><NavLink to={'/myBids'}>My Bids</NavLink></li>
                <li className="text-md"><NavLink to={'/bidRequest'}>Bid Request</NavLink></li>
            </>

        </>
    );

    return (
        <div>
            <div className="navbar bg-[#87C4FF] pt-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>

                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>

                    <a className="hidden lg:inline-block">
                        <img className="w-40" src={'https://i.ibb.co/QKSVWrJ/head-icon.png'} alt="https://i.ibb.co/QKSVWrJ/head-icon.png" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-blue-800 ">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-5">
                    {user ? (
                        <>
                            <div className="avatar flex-col">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                                    <img src={user?.photoURL || 'https://i.ibb.co/bFhtZ8y/deafault.png'} alt="https://i.ibb.co/bFhtZ8y/deafault.png" />
                                </div>
                                <h2 className="text-sm text-center">{user?.displayName}</h2>
                            </div>
                            <button className="btn btn-neutral text-[15px]" onClick={handleSignOut}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-neutral text-[15px] ">Log In</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;