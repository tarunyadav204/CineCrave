import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    const CinecraveLogo = () => (
        <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="40" fill="#0D0D0D" />
            <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold">
                <tspan fill="#EF476F">C</tspan>
                <tspan fill="#FFFFFF">inecrave</tspan>
            </text>
        </svg>);
    return (
        <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
            <Link to="/">
                <CinecraveLogo/>
            </Link>
        </div>
    );
};

export default AdminNavbar;
