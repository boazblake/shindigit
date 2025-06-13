import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useUserContext } from '../contexts/UserContext';
import { Event } from '../types/event';
import { Calendar, Search, Filter, Plus, Users, Gift, Clock, MapPin } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { events } = useEvents();
  const { user } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDateTime) > now);
  const pastEvents = events.filter(event => new Date(event.startDateTime) <= now);

  const filteredEvents = (events: Event[]) => {
    console.log(events)
    return !events.length ? []: 
     events.filter(event => {
      console.log(event, searchTerm)
      const matchesSearch = event?.title?.toLowerCase().includes(searchTerm?.toLowerCase()??'' ) ||
        event?.description.toLowerCase().includes(searchTerm?.toLowerCase());
      return matchesSearch;
    });
  };
console.log(upcomingEvents, pastEvents)
  const displayEvents = filter === 'upcoming' ? filteredEvents(upcomingEvents) :
    filter === 'past' ? filteredEvents(pastEvents) :
    filteredEvents(events);

  const totalRSVPs = events.reduce((acc: number, event: Event) => {
    const rsvpCount = Object.values(event.rsvps || {}).filter(status => status === 'going').length;
    return acc + rsvpCount;
  }, 0);

  const totalItems = events.reduce((acc: number, event: Event) => {
    const itemCount = event.items?.length || 0;
    return acc + itemCount;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.alias || 'Friend'}!
          </h1>
          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                <p className="text-2xl font-semibold text-gray-900">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total RSVPs</p>
                <p className="text-2xl font-semibold text-gray-900">{totalRSVPs}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Items Shared</p>
                <p className="text-2xl font-semibold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'upcoming' | 'past')}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/create-event')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </button>
          <button
            onClick={() => navigate('/events')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View All Events
          </button>
        </div>
      </div>

      {/* Events Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/create-event')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Event
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {filter !== 'past' && upcomingEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents(upcomingEvents).map(event => (
                    <div
                      key={event.id}
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(event.startDateTime).toLocaleString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-2" />
                            {event.rsvps?.length || 0} RSVPs
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filter !== 'upcoming' && pastEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents(pastEvents).map(event => (
                    <div
                      key={event.id}
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(event.startDateTime).toLocaleString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-2" />
                            {event.rsvps?.length || 0} RSVPs
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}