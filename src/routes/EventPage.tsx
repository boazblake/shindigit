import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@hooks/useEvents';
import { useEventContext } from '@contexts/EventContext';
import { useUserContext } from '@contexts/UserContext';
import InviteForm from '@components/InviteForm';
import { type RSVPstatus } from '@types/Event';

const EventPage = () => {
  const navigate = useNavigate();
  const { event, loading, isCreator } = useEventContext();
  const { user } = useUserContext();
  const { rsvpEvent } = useEvents();
  if (!event) return;
  const isInvited = !!event?.invitations;
  const canRSVP = () => !isCreator && (!event.isPrivate || isInvited);
  const isRSVPDisabled = !user || !canRSVP();

  const handleClaimItem = (itemId: string) => {
    try {
      const itemRef = gun
        .get('events')
        .get(event.id)
        .get('items')
        .get(itemId)
        .get('claimed');
      itemRef.get(user.pub).once((currentClaimed: number = 0) => {
        const newClaim = currentClaimed + 1;
        itemRef.get(user.pub).put(newClaim, (ack: any) => {
          if (ack.err) {
            console.error('Failed to claim item:', ack.err);
          }
        });
      });
    } catch (error) {
      console.error('Error claiming item:', error);
    }
  };

  const handleRSVP = async (rsvp: RSVPstatus) => {
    try {
      await rsvpEvent(event.id, rsvp);
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading Event...</div>;
  }

  if (!event) {
    return <div className="p-4">Event not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="mb-2">{event.description}</p>
      <p className="mb-2 font-semibold">Location: {event.location}</p>
      <p className="mb-2 font-semibold">
        Capacity: {event.capacity > 0 ? event.capacity : 'Unlimited'}
      </p>

      <div className="space-x-2 mt-4">
        <button
          onClick={() => handleRSVP('yes')}
          disabled={isRSVPDisabled}
          className={`px-4 py-2 rounded text-white ${!isRSVPDisabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
        >
          Attending
        </button>
        <button
          onClick={() => handleRSVP('no')}
          disabled={isRSVPDisabled}
          className={`px-4 py-2 rounded text-white ${!isRSVPDisabled ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
        >
          Not Attending
        </button>
        <button
          onClick={() => handleRSVP('maybe')}
          disabled={isRSVPDisabled}
          className={`px-4 py-2 rounded text-white ${!isRSVPDisabled ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
        >
          Maybe
        </button>
      </div>

      {isCreator && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Invite People</h2>
          <InviteForm eventId={event.id} />
        </div>
      )}

      {isInvited && event.items && (
        <div>
          <h2>Available Items</h2>
          <ul>
            {Object.entries(event.items).map(([itemId, item]) => {
              const total = Object.values(item.claimed).reduce(
                (sum, quantity) => sum + quantity,
                0
              );
              const remaining = item.quantity - total;
              return (
                <li key={itemId}>
                  {item.name} - Remaining:{' '}
                  {remaining > 0 ? remaining : 'All Taken'}
                  {remaining > 0 && (
                    <button onClick={() => handleClaimItem(itemId)}>
                      Claim
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventPage;
