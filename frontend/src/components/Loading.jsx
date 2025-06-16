import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-[80vh] flex-col'>
            <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary border-gray-300'></div>
            <p className='mt-4 text-sm text-gray-500'>Loading...</p>
        </div>
    );
};

export default Loading;
