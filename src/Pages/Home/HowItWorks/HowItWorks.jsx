import { RiListIndefinite } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center w-1/3 px-4">
            <svg
              className="h-24 w-24 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <RiListIndefinite></RiListIndefinite>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">List Your Product</h3>
            <p className="mt-2 text-base text-gray-500">
              Easily create a detailed listing for your product with our intuitive seller dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center w-1/3 px-4">
            <svg
              className="h-24 w-24 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <BiSearchAlt></BiSearchAlt>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Find Your Product</h3>
            <p className="mt-2 text-base text-gray-500">
              Discover a wide range of products from various sellers with our powerful search tools.
            </p>
          </div>
          <div className="flex flex-col items-center w-1/3 px-4">
            <svg
              className="h-24 w-24 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <BsCashCoin></BsCashCoin>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Payment</h3>
            <p className="mt-2 text-base text-gray-500">
              Enjoy peace of mind with secure and hassle-free payment options for every transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
