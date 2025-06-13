import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { isValidEventName } from '../utils/validators';
import { GunEvent } from '../types/gun';

export default function EditEventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();

  const [event, setEvent] = useState<GunEvent | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (eventId) {
      const ev = getEventById(eventId);
      if (ev) {
        setEvent(ev);
        setName(ev.name || '');
        setDescription(ev.description || '');
        setDate(ev.date || '');
        setLocation(ev.location || '');
      }
    }
  }, [eventId, getEventById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEventName(name)) {
      setError('Event name must be at least 3 characters.');
      return;
    }
    if (!date) {
      setError('Date is required.');
      return;
    }
    if (event) {
      await updateEvent({
        ...event,
        name,
        description,
        date,
        location,
        updatedAt: new Date().toISOString(),
      });
      navigate(`/event/${event.id}`);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <label>
          Name
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date
          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Location
          <input value={location} onChange={e => setLocation(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
