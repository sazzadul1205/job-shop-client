import  { useState } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const BidRequestRow = ({ bid, index, handleReject, handleAccept }) => {
    const { _id, title, sellerEmail, bidderDeadline, status, minPrice, maxPrice, bidderEmail, Bid } = bid;
    const [isRejectDisabled, setIsRejectDisabled] = useState(false);

    const handleRejectClick = () => {
        console.log('Reject clicked for bid with ID:', _id);
        setIsRejectDisabled(true);
        const updatedBid = {
            Bid: Bid,
            bidderDeadline: bidderDeadline,
            bidderEmail: bidderEmail,
            maxPrice: maxPrice,
            minPrice: minPrice,
            sellerEmail: sellerEmail,
            title: title,
            status: 'Rejected',
        };
        handleReject(_id, updatedBid);
    };

    const handleAcceptClick = () => {
        console.log('Accept clicked for bid with ID:', _id);
        setIsRejectDisabled(true);
        const updatedBid = {
            Bid: Bid,
            bidderDeadline: bidderDeadline,
            bidderEmail: bidderEmail,
            maxPrice: maxPrice,
            minPrice: minPrice,
            sellerEmail: sellerEmail,
            title: title,
            status: 'In Progress',
        };
        handleAccept(_id, updatedBid);
    };

    const isButtonVisible = status === 'pending';
    const isButtonDisabled = status === 'complete' || status === 'rejected' || status === 'accepted';
    const isAcceptDisabled = status === 'rejected' || status === 'accepted';

    return (
        <tr>
            <th>{index + 1}</th>
            <th>{title}</th>
            <th>{bidderEmail}</th>
            <th>{bidderDeadline}</th>
            <th>{Bid}$</th>
            <th>{status}</th>
            {isButtonVisible && (
                <th>
                    <button
                        onClick={handleRejectClick}
                        className={`bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 flex items-center rounded-xl ${isRejectDisabled || isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                        disabled={isRejectDisabled || isButtonDisabled}
                    >
                        Reject
                    </button>
                </th>
            )}
            {status === 'In Progress' ? (
                <th>
                    <ProgressBar
                        percent={50} 
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    />
                </th>
            ) : (
                <th>
                    <button
                        onClick={handleAcceptClick}
                        className={`bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-6 flex items-center rounded-xl ${isAcceptDisabled || isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                        disabled={isAcceptDisabled || isButtonDisabled}
                    >
                        Accept
                    </button>
                </th>
            )}
        </tr>
    );
};

export default BidRequestRow;
