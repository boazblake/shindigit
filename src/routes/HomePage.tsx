import { useNavigate } from 'react-router-dom';
import { useEvents } from '@hooks/useEvents';
import EventCard from '@components/EventCard'

interface Event {
  id: string;
  title: string;
  description: string;
  createdBy: string;
}

const HomePage = () => {
  const { events}  = useEvents(); 
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Events</h1>
      <button
        onClick={() => navigate('/create')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Event
      </button>
     <button
        onClick={() => navigate('/profile')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Profile
      </button>
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard event={event} key={event.id}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
