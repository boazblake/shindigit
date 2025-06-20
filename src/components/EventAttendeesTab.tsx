import type { Event } from '../types/event.ts';
import { Users, UserCheck, UserX, User, Crown } from 'lucide-react';

interface EventAttendeesTabProps {
  event: Event;
}

const EventAttendeesTab = ({ event }: EventAttendeesTabProps) => {
  const attendees = Object.entries(event.rsvps || {});

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'yes':
        return <UserCheck className="w-4 h-4 text-green-500" />;
      case 'no':
        return <UserX className="w-4 h-4 text-red-500" />;
      case 'maybe':
        return <User className="w-4 h-4 text-yellow-500" />;
      default:
        return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'yes':
        return 'Attending';
      case 'no':
        return 'Not Attending';
      case 'maybe':
        return 'Maybe';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yes':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'no':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'maybe':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const attendingCount = attendees.filter(
    ([_, status]) => status === 'yes'
  ).length;
  const maybeCount = attendees.filter(
    ([_, status]) => status === 'maybe'
  ).length;
  const notAttendingCount = attendees.filter(
    ([_, status]) => status === 'no'
  ).length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-900">
                {attendingCount}
              </p>
              <p className="text-sm text-green-700">Attending</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-900">{maybeCount}</p>
              <p className="text-sm text-yellow-700">Maybe</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <UserX className="w-6 h-6 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-900">
                {notAttendingCount}
              </p>
              <p className="text-sm text-red-700">Not Attending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendees List */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Responses</h3>
          <p className="text-sm text-gray-600 mt-1">
            {attendees.length}{' '}
            {attendees.length === 1 ? 'person has' : 'people have'} responded
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {attendees.length > 0 ? (
            attendees.map(([userPub, status]) => (
              <div
                key={userPub}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {userPub.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          {userPub.slice(0, 16)}...
                        </p>
                        {userPub === event.createdBy && (
                          <Crown
                            className="w-4 h-4 text-yellow-500"
                            // title="Event Creator"
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{userPub}</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(status)}`}
                  >
                    {getStatusIcon(status)}
                    <span>{getStatusText(status)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                No responses yet
              </h4>
              <p className="text-gray-500">
                Be the first to RSVP to this event!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventAttendeesTab;
