import React from "react";
import { FaPlus } from "react-icons/fa";
import RSVPButton from "./events/RSVPButton";
const EventCard = ({
  title,
  startDate,
  endDate,
  description,
  organizer,
  seatsLeft,
  type,
  location,
  isFiltered = false,
  image,
  create_Button,
  id,
  onClick,
  event,
  onRSVP,
}) => {
  return (
    <div className='relative h-full bg-[#272727] rounded-lg shadow-lg overflow-hidden flex flex-col'>
      <img
        className='w-full h-48 object-cover'
        src={image}
        alt={title}
      />
      <div className='p-4 flex-grow flex flex-col justify-between'>
        <div>
          <h3 className='text-2xl font-semibold text-white'>{title}</h3>
          <p className='text-white mt-2 mb-2 max-h-[6rem] line-clamp-4'>
            {description}
          </p>
          <span className='px-3 py-1 bg-white text-black rounded-full text-sm'>
            {type}
          </span>

          <div className='mt-4 space-y-2'>
            <div className='flex items-center text-white'>
              <svg
                className='w-4 h-4 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
              <span>
                {new Date(startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {new Date(endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className='flex items-center text-white'>
              <svg
                className='w-4 h-4 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              <span>{location}</span>
            </div>

            <div className='flex items-center text-white'>
              <svg
                className='w-4 h-4 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
              <span>By {organizer}</span>
            </div>

            <div className='flex items-center text-white'>
              <svg
                className='w-4 h-4 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                  clipRule='evenodd'
                />
              </svg>
              <span>
                {new Date(startDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) +
                  " - " +
                  new Date(endDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </span>
            </div>
          </div>

          <div className='mt-4'>
            <span className='text-white font-medium'>
              {seatsLeft} seats left
            </span>
          </div>
        </div>
        

        <div className='mt-4'>
          {seatsLeft > 0 && (
            <RSVPButton event={event} onRSVP={onRSVP} />
          )}
          {create_Button && (
            <button
              onClick={onClick}
              className='w-full bg-white text-black px-4 py-2 rounded-lg mt-2'
            >
              <FaPlus />
            </button>
          )}
        </div>

           
      </div>
    </div>
  );
};

export default EventCard;
