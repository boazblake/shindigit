import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useEventContext } from '../contexts/EventContext';
import { useUserContext } from '../contexts/UserContext';
import InviteForm from '../components/InviteForm';
import { type RSVPstatus } from '../types/event';
import { gun } from '../services/gunService';
import { Calendar, MapPin, Users, Clock, Gift, Check, X, HelpCircle } from 'lucide-react';

const EventPage = () => {
  const navigate = useNavigate();
  const { event, loading, isCreator } = useEventContext();
  const { user } = useUserContext();
  const { rsvpEvent } = useEvents();
  if (!event) return;
  const isInvited = !!event?.invited?.[user?.pub || ''];
  const canRSVP = () => !isCreator && (!event.isPrivate || isInvited);
  const isRSVPDisabled = !user || !canRSVP();

  const handleClaimItem = (itemId: string) => {
    if (!user) return;
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
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading event...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Event not found</h1>
            <p className="mt-2 text-gray-500">The event you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Event Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date & Time</p>
                <p className="text-gray-900">
                  {new Date(event.startDateTime).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-900">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Capacity</p>
                <p className="text-gray-900">
                  {event.capacity > 0 ? event.capacity : 'Unlimited'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-gray-900">
                  {event.isAllDay ? 'All Day' : 'Custom Duration'}
                </p>
              </div>
            </div>
          </div>

          {/* RSVP Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => handleRSVP('going')}
              disabled={isRSVPDisabled}
              className={`inline-flex items-center px-4 py-2 rounded-md text-white ${
                !isRSVPDisabled 
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500' 
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              } transition-colors`}
            >
              <Check className="h-5 w-5 mr-2" />
              Attending
            </button>
            <button
              onClick={() => handleRSVP('not_going')}
              disabled={isRSVPDisabled}
              className={`inline-flex items-center px-4 py-2 rounded-md text-white ${
                !isRSVPDisabled 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500' 
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              } transition-colors`}
            >
              <X className="h-5 w-5 mr-2" />
              Not Attending
            </button>
            <button
              onClick={() => handleRSVP('maybe')}
              disabled={isRSVPDisabled}
              className={`inline-flex items-center px-4 py-2 rounded-md text-white ${
                !isRSVPDisabled 
                  ? 'bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500' 
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              } transition-colors`}
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Maybe
            </button>
          </div>

          {/* Invite Form */}
          {isCreator && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Invite People</h2>
              <InviteForm eventId={event.id} />
            </div>
          )}

          {/* Items Section */}
          {isInvited && event.items && event.items.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(event.items).map(([itemId, item]) => {
                  const total = Object.values(item.claimed).reduce(
                    (sum, quantity) => sum + quantity,
                    0
                  );
                  const remaining = item.quantity - total;
                  return (
                    <div
                      key={itemId}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Gift className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {remaining > 0 ? `${remaining} remaining` : 'All taken'}
                          </p>
                        </div>
                      </div>
                      {remaining > 0 && (
                        <button
                          onClick={() => handleClaimItem(itemId)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                          Claim
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
