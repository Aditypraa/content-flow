import React from "react";

interface LogoProps {
    className?: string;
    variant?: "default" | "white";
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = "default" }) => {
    const colorClass = variant === "white" ? "bg-white" : "bg-[#000150]";
    const primaryColor = variant === "white" ? "bg-white" : "bg-[#0004e8]";

    return (
        <div className={`w-[134px] h-6 relative overflow-hidden ${className}`}>
            <div className={`w-[20.18px] h-[22.33px] left-0 top-0 absolute ${primaryColor}`} />
            <div className={`w-[19.05px] h-[11.65px] left-[114.95px] top-[6.83px] absolute ${colorClass}`} />
            <div className={`w-[11px] h-[11.63px] left-[101.80px] top-[7px] absolute ${colorClass}`} />
            <div className={`w-[9.58px] h-[11.86px] left-[90.66px] top-[6.81px] absolute ${colorClass}`} />
            <div className={`w-3 h-[17.14px] left-[77.90px] top-[6.81px] absolute ${colorClass}`} />
            <div className={`w-[3.58px] h-[16.25px] left-[72.52px] top-[2.23px] absolute ${colorClass}`} />
            <div className={`w-[11.87px] h-[11.86px] left-[59.55px] top-[6.81px] absolute ${colorClass}`} />
            <div className={`w-[11.87px] h-[11.86px] left-[47px] top-[6.81px] absolute ${colorClass}`} />
            <div className={`w-[11.87px] h-[11.86px] left-[34.45px] top-[6.81px] absolute ${colorClass}`} />
            <div className={`w-[7.71px] h-[14.47px] left-[26.35px] top-[4.02px] absolute ${colorClass}`} />
            <div className={`w-[11.11px] h-[5.83px] left-[47.77px] top-[17.96px] absolute ${colorClass}`} />
        </div>
    );
};

export default Logo;
