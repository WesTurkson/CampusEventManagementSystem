import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const EventCalendar = ({
  onDateSelect,
  onPreferencesChange,
  events,
  preferences,
}) => {
  // Function to check if date has events
  const hasEvents = (date) => {
    return events.some((event) => {
      const eventStartDate = new Date(event.startDateTime);
      return eventStartDate.toDateString() === date.toDateString();
    });
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    // Convert both dates to midnight for comparison
    const selectedDate = new Date(date.setHours(0, 0, 0, 0));
    onDateSelect(selectedDate);
  };

  // Updated tile content with new styling
  const tileContent = ({ date, view }) => {
    if (view === "month" && hasEvents(date)) {
      return (
        <div className='h-1.5 w-1.5 bg-blue-400 rounded-full mx-auto mt-1'></div>
      );
    }
  };

  // Add custom class to tiles
  const tileClassName = ({ date, view }) => {
    if (view === "month" && hasEvents(date)) {
      return 'has-events';
    }
  };

  return (
    <div
      className='bg-[#27272a] rounded-xl shadow-lg p-6 border border-gray-800'
      style={{ width: "" }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Event Calendar</h2>
      </div>

      <div className='calendar-container bg-transparent'>
        <Calendar
          onChange={handleDateSelect}
          tileContent={tileContent}
          tileClassName={tileClassName}
          prevLabel={<FiChevronLeft className='text-gray-300' />}
          nextLabel={<FiChevronRight className='text-gray-300' />}
          className='rounded-lg'
        />
      </div>
    </div>
  );
};

export default EventCalendar;
