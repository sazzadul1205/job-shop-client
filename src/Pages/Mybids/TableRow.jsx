import { useState } from 'react';

const TableRow = ({ bid, index, handleComplete }) => {
    const { _id, title, sellerEmail, bidderDeadline, status, minPrice, maxPrice, bidderEmail, Bid } = bid;
    const [isDisabled, setIsDisabled] = useState(false);

    const handleButtonClick = () => {
        console.log('Button clicked');
        setIsDisabled(true);
        const updatedBid = {
            Bid: Bid,
            bidderDeadline: bidderDeadline,
            bidderEmail: bidderEmail,
            maxPrice: maxPrice,
            minPrice: minPrice,
            sellerEmail: sellerEmail,
            title: title,
            status: 'Compleat',
        };
        console.log(updatedBid);
        handleComplete(_id, updatedBid);
        
    };

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{title}</td>
            <td>{sellerEmail}</td>
            <td>{bidderDeadline}</td>
            <td>{status}</td>
            <td>
                {isDisabled ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    <button
                        onClick={handleButtonClick}
                        className={`bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-6 rounded flex items-center ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                        disabled={status === 'Compleat' || isDisabled}
                    >
                        Complete
                    </button>
                )}
            </td>
        </tr>
    );
};

export default TableRow;
