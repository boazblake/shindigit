import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';

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
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border rounded cursor-pointer"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">Created by {event.createdBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
