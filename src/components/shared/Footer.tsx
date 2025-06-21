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
        <footer className={`bg-gray-900 text-white py-12 ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{brandName}</h3>
                        <p className="text-gray-400">Your trusted source for quality content and insights.</p>
                    </div>
                    <div>
                        <h4 className="text-md font-medium mb-4">Categories</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Technology</a></li>
                            <li><a href="#" className="hover:text-white">Design</a></li>
                            <li><a href="#" className="hover:text-white">Business</a></li>
                            <li><a href="#" className="hover:text-white">Marketing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-medium mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">About</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                            <li><a href="#" className="hover:text-white">Privacy</a></li>
                            <li><a href="#" className="hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-medium mb-4">Connect</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Twitter</a></li>
                            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white">Instagram</a></li>
                            <li><a href="#" className="hover:text-white">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    © {year} {brandName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
