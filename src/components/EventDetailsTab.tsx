import { Event, RSVPstatus } from '@types/event';
import { Calendar, MapPin, Users, Lock, Globe } from 'lucide-react';

interface EventDetailsTabProps {
  event: Event;
  isRSVPDisabled: boolean;
  onRSVP: (rsvp: RSVPstatus) => void;
}

const EventDetailsTab = ({ event, isRSVPDisabled, onRSVP }: EventDetailsTabProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAttendeeCount = () => {
    return Object.values(event.rsvps || {}).filter(
      status => status === 'yes'
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
              {event.isPrivate ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Private</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Public</span>
                </div>
              )}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{formatDate(event.timestamp)}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5 text-red-500" />
            <span className="font-medium">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-5 h-5 text-green-500" />
            <span className="font-medium">
              {getAttendeeCount()} attending
              {event.capacity > 0 && ` / ${event.capacity} max`}
            </span>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Response</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onRSVP('yes')}
            disabled={isRSVPDisabled}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !isRSVPDisabled
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            ✓ Attending
          </button>
          <button
            onClick={() => onRSVP('maybe')}
            disabled={isRSVPDisabled}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !isRSVPDisabled
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            ? Maybe
          </button>
          <button
            onClick={() => onRSVP('no')}
            disabled={isRSVPDisabled}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !isRSVPDisabled
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            ✗ Not Attending
          </button>
        </div>
        {isRSVPDisabled && (
          <p className="text-sm text-gray-500 mt-3">
            You need to be invited to RSVP to this private event.
          </p>
        )}
      </div>

      {/* Event Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Created by:</span>
            <span className="font-medium text-gray-900">{event.createdBy.slice(0, 16)}...</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Event Type:</span>
            <span className="font-medium text-gray-900">
              {event.isPrivate ? 'Private Event' : 'Public Event'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Capacity:</span>
            <span className="font-medium text-gray-900">
              {event.capacity > 0 ? `${event.capacity} people` : 'Unlimited'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsTab;