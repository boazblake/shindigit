import { Event } from '@types/event';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Lock, Globe } from 'lucide-react';

const EventCard = ({ event }: { event: Event }) => {
  const navigate = useNavigate();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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

  const getMaybeCount = () => {
    return Object.values(event.rsvps || {}).filter(
      status => status === 'maybe'
    ).length;
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              {event.isPrivate ? (
                <Lock className="w-4 h-4 text-amber-500" />
              ) : (
                <Globe className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {event.description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.timestamp)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>
                {getAttendeeCount()} attending
                {getMaybeCount() > 0 && `, ${getMaybeCount()} maybe`}
              </span>
            </div>

            {event.capacity > 0 && (
              <div className="text-xs text-gray-400">
                {event.capacity - getAttendeeCount()} spots left
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Created by {event.createdBy.slice(0, 8)}...
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;