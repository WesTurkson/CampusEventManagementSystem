import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/eventService";
const RSVPButton = ({ event, onRSVP }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUserRSVPed, setIsUserRSVPed] = useState(false);
  const [isEventFull, setIsEventFull] = useState(false);
  const [isEventPassed, setIsEventPassed] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setIsUserRSVPed(
      event.attendees.some((attendee) => attendee?.user?._id === user?.id)
    );
    setIsEventFull(event.attendees.length >= event.capacity);
    setIsEventPassed(new Date(event.endDate) < new Date());
  }, [event, event.attendees, event.capacity, event.endDate, user?.id]);

  const handleRSVPError = (error) => {
    if (error.code === 403) {
      toast.error("You've already reserved to this event");
    } else if (error.code === 406) {
      toast.error("Event is at full capacity");
    } else {
      toast.error("Failed to reserve. Please try again later.");
    }
  };

  const getButtonClassName = () => {
    if (isUserRSVPed) {
      return "bg-green-500 text-white px-4 py-2 rounded-lg cursor-not-allowed";
    }
    if (isEventFull) {
      return "bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed";
    }
    return "bg-white hover:bg-gray-700 text-black px-4 py-2 rounded-lg";
  };

  const getButtonText = () => {
    if (loading) return "Processing...";
    if (isUserRSVPed) return "Reserved";
    if (isEventFull) return "Full";
    return "Reserve Seat";
  };

  const handleRSVP = async () => {
    if (!user) {
      toast.error("Please login to RSVP");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/events/${event._id}/rsvp`);
      onRSVP && onRSVP(response.data);
      toast.success("Successfully reserved to event!");
    } catch (error) {
      handleRSVPError(error);
    } finally {
      setLoading(false);
      navigate(`/`);
    }
  };

  if (isEventPassed) {
    return <span className='text-gray-500'>Event has ended</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className='flex items-center w-full gap-4 mt-5'>
        <button
          onClick={handleRSVP}
        disabled={loading || isUserRSVPed || isEventFull}
        className={`${getButtonClassName()} w-full bg-[#18181b]`}
      >
        {getButtonText()}
      </button>

      {isUserRSVPed && (
        <button
          onClick={() => navigate(`/my-events#${event._id}`)}
          className='hover:opacity-50 text-white px-4 py-2 rounded-lg flex items-center'
        >
          <span>View</span>
          <FaChevronRight className='ml-2' />
        </button>
      )}
      </div>
      {isAdmin && (
        <button
          onClick={() => {
            deleteEvent(event._id)
              .then(() => {
                toast.success("Event deleted successfully");
                onRSVP && onRSVP(event);
              })
              .catch((error) => {
                console.log(error)
                toast.error("Failed to delete event");
              })
          }}
          className='w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-2'
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default RSVPButton;