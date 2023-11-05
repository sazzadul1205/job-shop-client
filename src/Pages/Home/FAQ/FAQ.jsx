import { useState } from 'react';



const FAQ = () => {
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: 'How can I list my products on the marketplace?',
            answer: 'Listing your products on our marketplace is easy. Simply create an account and follow the steps outlined in the seller dashboard.',
        },
        {
            question: 'What payment methods are supported on the platform?',
            answer: 'We support various payment methods including credit cards, PayPal, and other secure online payment options.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach our customer support team via the "Contact Us" page or by emailing support@onlinemarketplace.com.',
        },
        {
            question: 'Is there a fee for using the platform as a seller?',
            answer: 'There may be a small fee associated with listing certain products. Please refer to our seller policies for more information.',
        },
        {
            question: 'How can I track my orders?',
            answer: 'Once your order is confirmed and shipped, you will receive a tracking number. You can use this number to track the status of your order.',
        },
    ];

    const visibleFaqs = showMore ? faqs : faqs.slice(0, 4);

    return (
        <div className="bg-[#205295] pt-5">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                {visibleFaqs.map((faq, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{faq.question}</h3>
                            <button className="focus:outline-none">
                               ?
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
            {!showMore && (
                <div className="text-center pb-5">
                    <button
                        className="bg-white text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                        onClick={() => setShowMore(true)}
                    >
                        More
                    </button>
                </div>
            )}
        </div>
    );
};

export default FAQ;
