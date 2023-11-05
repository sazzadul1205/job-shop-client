import { useState } from 'react';

const TableRow = ({ bid, index, handleComplete }) => {
    const { _id, title, sellerEmail, bidderDeadline, status, minPrice, maxPrice, bidderEmail, Bid } = bid;
    const [isButtonVisible, setIsButtonVisible] = useState(status === 'Rejected' || status === 'In Progress');

    const handleButtonClick = () => {
        console.log('Button clicked');
        const updatedBid = {
            Bid: Bid,
            bidderDeadline: bidderDeadline,
            bidderEmail: bidderEmail,
            maxPrice: maxPrice,
            minPrice: minPrice,
            sellerEmail: sellerEmail,
            title: title,
            status: 'Completed',
        };
        console.log(updatedBid);
        handleComplete(_id, updatedBid);
        setIsButtonVisible(false);
    };

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{title}</td>
            <td>{sellerEmail}</td>
            <td>{bidderDeadline}</td>
            <td>{status}</td>
            <td>
                {isButtonVisible && (
                    <button
                        onClick={handleButtonClick}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-6 rounded flex items-center"
                    >
                        Complete
                    </button>
                )}
            </td>
        </tr>
    );
};

export default TableRow;
