import React, { useState, useEffect, useCallback } from "react";
import { FiCalendar, FiMapPin, FiClock, FiUsers } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { getMyEvents, cancelRSVP } from "../services/eventService";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
const MyEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const { user } = useAuth();

  const fetchMyEvents = useCallback(async () => {
    const events = await getMyEvents(user.id);
    setBookedEvents(events);
  }, [user.id]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const cancelBooking = async (eventId) => {
    const loadingToast = toast.loading("Cancelling your Reservation...");
    try {
      await cancelRSVP(eventId);
      toast.dismiss(loadingToast);
      toast.success("Reservation cancelled successfully!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to cancel Reservation.");
    }
    fetchMyEvents();
  };

  return (
    <>
      <Navbar hideMyEvents={true} />
      <div className='min-h-screen pt-8'>
        <div className='max-w-5xl mx-auto px-4'>
          {bookedEvents.length === 0 ? (
            <div className='text-center py-16 '>
              <div className='max-w-md mx-auto'>
                <FiCalendar className='mx-auto h-12 w-12 text-[#27272a]' />
                <h3 className='mt-4 text-lg font-medium text-[#27272a]'>
                You haven't booked any upcoming events yet.
                </h3>
              </div>
            </div>
          ) : (
            <div className='grid gap-6'>
              {bookedEvents.map((event) => (
                <div
                  id={event._id}
                  key={event._id}
                  className='bg-[#27272a] hover:shadow-md transition-all duration-200 overflow-hidden rounded-xl'
                >
                  <div className='p-6'>
                    <div className='flex flex-col md:flex-row justify-between items-start'>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-3'>
                          <h2 className='text-xl font-semibold text-gray-100'>
                            {event.name}
                          </h2>
                          <span className='inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full'>
                            {event.category}
                          </span>
                        </div>
                        <p className='mt-2 text-gray-300 text-sm'>
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='flex items-center text-white'>
                        <FiCalendar className='mr-2 text-gray-300' />
                        <span className='text-sm'>
                          {new Date(event.startDateTime).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          ) +
                            " - " +
                            new Date(event.endDateTime).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                        </span>
                      </div>
                      <div className='flex items-center text-white'>
                        <FiClock className='mr-2 text-gray-300' />
                        <span className='text-sm'>
                          {new Date(event.startDateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          ) +
                            " - " +
                            new Date(event.endDateTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </span>
                      </div>
                      <div className='flex items-center text-white'>
                        <FiMapPin className='mr-2 text-gray-300' />
                        <span className='text-sm'>{event.location}</span>
                      </div>
                      <div className='flex items-center text-white'>
                        <FiUsers className='mr-2 text-gray-300' />
                        <span className='text-sm'>
                          {event.attendees?.length || 0} attendees
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => cancelBooking(event._id)}
                      className='px-4 py-2 text-sm hover:bg-red-400 border border-red-500 rounded-lg bg-red-500 text-white transition-colors mt-4'
                    >
                      Cancel Booking
                    </button>
                  </div>

                  {/* <div className='px-6 py-4 bg-gray-700 border-t border-gray-600 flex justify-between items-center'>
                    <span className='text-sm text-gray-300'>
                      Booked on{" "}
                      {new Date(
                        event.attendees.find(
                          (attendee) => attendee.user._id === user.id
                        ).registrationDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyEvents;
