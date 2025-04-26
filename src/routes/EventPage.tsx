import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types/event';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const { events, rsvpEvent } = useEvents();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/home'); // Redirect if no ID
      return;
    }
    const found = events.find((ev) => ev.id === id);
    setEvent(found || null);
  }, [events, id, navigate]);

  const handleRsvp = async () => {
    if (event && id) {
      await rsvpEvent(id);
    }
  };

  if (!event) {
    return <div className="p-4">Loading Event...</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate('/home')}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="mb-4">{event.description}</p>
      <button
        onClick={handleRsvp}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        RSVP
      </button>
      <div>
        <h2 className="text-xl font-semibold mb-2">RSVPs:</h2>
        <ul className="list-disc pl-5">
          {event.rsvps && Object.keys(event.rsvps).length > 0 ? (
            Object.keys(event.rsvps).map((pubKey) => (
              <li key={pubKey} className="text-gray-700">
                {pubKey}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No RSVPs yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EventPage;
