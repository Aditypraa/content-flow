import React from 'react';

interface FooterProps {
    brandName?: string;
    year?: number;
    className?: string;
}

export default function Footer({
    brandName = "Blog genzet",
    year = new Date().getFullYear(),
    className = ""
}: FooterProps) {
    return (
        <div className={`self-stretch h-[100px] relative bg-blue-600/90 overflow-hidden ${className}`}>
            <div className="left-[506px] top-[37px] absolute inline-flex justify-start items-center gap-4">
                <div className="w-[133.40px] h-6 relative overflow-hidden">
                    <div className="w-[20.09px] h-[22.33px] left-0 top-0 absolute bg-white" />
                    <div className="w-[18.97px] h-[11.65px] left-[114.43px] top-[6.83px] absolute bg-white" />
                    <div className="w-[10.95px] h-[11.63px] left-[101.34px] top-[7px] absolute bg-white" />
                    <div className="w-[9.54px] h-[11.86px] left-[90.25px] top-[6.81px] absolute bg-white" />
                    <div className="w-[11.94px] h-[17.14px] left-[77.55px] top-[6.81px] absolute bg-white" />
                    <div className="w-[3.57px] h-[16.25px] left-[72.19px] top-[2.23px] absolute bg-white" />
                    <div className="w-[11.82px] h-[11.86px] left-[59.29px] top-[6.81px] absolute bg-white" />
                    <div className="w-[11.82px] h-[11.86px] left-[46.79px] top-[6.81px] absolute bg-white" />
                    <div className="w-[11.82px] h-[11.86px] left-[34.30px] top-[6.81px] absolute bg-white" />
                    <div className="w-[7.67px] h-[14.47px] left-[26.23px] top-[4.02px] absolute bg-white" />
                    <div className="w-[11.06px] h-[5.83px] left-[47.56px] top-[17.96px] absolute bg-white" />
                </div>
                <div className="justify-start text-white text-base font-normal font-['Archivo'] leading-normal">© {year} {brandName}. All rights reserved.</div>
            </div>
        </div>
    );
}
