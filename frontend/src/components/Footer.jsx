import React from 'react';

const Footer = () => {
    const CinecraveLogo = () => (
        <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="40" fill="#0D0D0D" />
            <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold">
                <tspan fill="#EF476F">C</tspan>
                <tspan fill="#FFFFFF">inecrave</tspan>
            </text>
        </svg>);
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    {/*<img
                        className="h-9"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
                        alt="dummyLogoDark"
                    />*/}
                    <CinecraveLogo />
                    <p className="mt-6 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+1-212-456-7890</p>
                            <p>contact@example.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2024 © CineCrave. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
