import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import DateSelect from '../components/DateDelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const MovieDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const navigate = useNavigate();

    const getShow = async () => {
        const foundShow = dummyShowsData.find((show) => show._id === id);
       if(foundShow){
           setShow({
               movie: foundShow,
               dateTime: dummyDateTimeData,
           });
       }
    };

    useEffect(() => {
        getShow();
    }, [id]);

   

    return show ? (
        <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
            <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

                {/* Poster Image */}
                <img
                    src={show.movie.poster_path}
                    alt=""
                    className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
                />

                {/* Movie Info */}
                <div className='relative flex flex-col gap-3'>
                    <BlurCircle top='-100px' left='-100px' />
                    <p className='text-primary'>ENGLISH</p>
                    <h1 className='text-4xl font-semibold max-w-96 text-balance'>
                        {show.movie.title}
                    </h1>
                    <div className='flex items-center gap-2 text-gray-300'>
                        <StarIcon className='w-5 h-5 text-primary fill-primary' />
                        
                        {show.movie.vote_average.toFixed(1)} User Ratings
                    </div>

                    <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
                        {show.movie.overview}
                    </p>

                    <p className='text-sm text-gray-300 mt-2'>
                        {timeFormat(show.movie.runtime)} • {show.movie.genres.map((genre) => genre.name).join(', ')}
                    </p>

                    <p className='text-sm text-gray-400 mt-1'>
                        • {show.movie.release_date.split('-').reverse().join('/')}
                    </p>

                    <div className='flex items-center flex-wrap gap-4 mt-4'>
                        {/* Watch Trailer Button */}
                        <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
                            <PlayCircleIcon className="w-5 h-5" />
                            Watch Trailer
                        </button>

                        {/* Buy Tickets Link Button */}
                        <a
                            href="#dateSelect"
                            className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'
                        >
                            Buy Tickets
                        </a>

                        {/* Heart Icon Button */}
                        <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                            <Heart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

          <p>Your Favorite Casts</p>
            <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
                <div className='flex items-center gap-4 w-max px-4'>
                    {show.movie.casts.map((cast, index) => (
                        <div key={index} className='flex flex-col items-center text-center'>
                            <img
                                src={cast.profile_path}
                                alt={cast.name}
                                className='rounded-full h-20 md:h-20 aspect-square object-cover'
                            />
                            <p className='font-medium mt-3 text-xs text-gray-200'>{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>

                <DateSelect  dateTime={show.dateTime} id={id} />
            <div>
                <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>

                <div className='flex flex-wrap max-sm:justify-center gap-8'>
                    {dummyShowsData.slice(0, 4).map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </div>

                <div className='flex justify-center mt-20'>
                    <button
                        className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
                        onClick={() => {
                            navigate('/movies');
                            window.scrollTo(0, 0);
                        }}
                    >
                        Show more
                    </button>
                </div>
            </div>
                

        </div>
    ) : (
       <Loading/>
      );
};

export default MovieDetails;
