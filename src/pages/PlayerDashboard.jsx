import React from 'react';
import { useNavigate } from 'react-router';
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import faqFrame from '../assets/abs-items/faq-frame.png';
import PayCard from '../components/dashboard/PayCard';
import History from './History';

const copyItems = ["/deposit", "/withdraw"];

const PlayerDashboard = () => {
    const navigate = useNavigate();

    const payItems = [
        {
            icon: <GiPayMoney size={40} className="text-white" />,
            title: "Deposit",
            desc: "Add funds to wallet",
            titleColor: "text-lime-600",
            handleClick: () => {
                const brandSlug = localStorage.getItem("brand");
                navigate(`/${brandSlug}/deposits`);
            }
        },
        {
            icon: <GiReceiveMoney size={40} className="text-white" />,
            title: "Withdraw",
            desc: "Withdraw funds",
            titleColor: "text-yellow-400",
            handleClick: () => {
                const brandSlug = localStorage.getItem("brand");
                navigate(`/${brandSlug}/withdrawals`);
            }
        },
    ];

    return (
        <>
            {/* Dashboard Content */}
            <div className="container-xxl dashboard bg-transparent position-relative mt-4  min-vh-100">
                {/* Background Shapes */}
                <div className="shape-area">
                    <img src={faqFrame} className="shape-1" alt="icon" />
                    <img src={faqFrame} className="shape-2" alt="icon" />
                </div>
                <div className="row g-4 g-md-5">
                    {payItems.map((item, index) => (
                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                            <PayCard
                                onClick={item.handleClick}
                                icon={item.icon}
                                title={item.title}
                                desc={item.desc}
                                titleColor={item.titleColor}
                            />
                        </div>
                    ))}

                    <div className="col-12">
                        <History />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayerDashboard;
