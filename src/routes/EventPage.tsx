import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '@hooks/useEvents';
import { Event } from '@types/event';
import { useEventContext } from '@contexts/EventContext';
import { useUserContext } from '@contexts/UserContext';
import InviteForm from '@components/InviteForm';
import { type RSVPstatus } from '@types/Event';

const EventPage = () => {
  const navigate = useNavigate();
  const { event, loading, accessAllowed, isCreator } = useEventContext();
  const { events, rsvpEvent } = useEvents();
  const { user } = useUserContext();
  const isInvited = !!event?.invitations;
  const canRSVP = () => event.isPrivate && !isCreator && !isInvited;

const handleClaimItem = () => {
    const itemRef = gun.get('events').get(event.id).get('items').get(itemId).get('claimed')
    itemRef.get(user.pub).once((currentClaimed: number = 0) => 
   { const newClaim = currentClaimed + 1 
itemRef.get(user.pub).put(newClaim)
}    )
  }

  const handleRSVP = async (rsvp: RSVPstatus) => {
    try {
      await rsvpEvent(event.id, rsvp);
    } catch (error) {
      console.error('failed to rsvp', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading Event...</div>;
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
          disabled={!user || !canRSVP()}
          className={`px-4 py-2 rounded text-white ${user && canRSVP() ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
        >
                    Attending       
        </button>
               
        <button
          onClick={() => handleRSVP('no')}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
                    Not Attending       
        </button>
               
        <button
          onClick={() => handleRSVP('maybe')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
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
        
      {
        isInvited &&
          (
          <div>
              <h2>Availble Items</h2>
              <ul>
                { Object.entries(event.items).map(
                ([itemId, item]) => {
                  const total = Object.values(item.claimed)
                   .reduce((sum, quantity) => sum + quantity, 0);
                  const remaining = item.quantity - total
                      return (
                  <li key={itemId}>
                    {item.name} - Remaining: {remaining > 0 ? remaining : 'All Taken'}
                     {remaining > 0 && <button onClick={handleClaimItem}>Claim</button>}
                  </li>)})}
              </ul>
          </div>
}          </div>
};

export default EventPage;
