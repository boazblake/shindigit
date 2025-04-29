import {Event} from '@types/event'
import { useNavigate } from 'react-router-dom';



const EventCard = ({event}:{event:Event}) => {
const navigate = useNavigate()



  return (
          <button
            key={event.id}
            className="p-4 border rounded cursor-pointer"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.capacity ? event.capacity : 'unlimited'}</p>
            <p>{event.isPrivate && 'private event'}</p>
            <p className="text-sm text-gray-500">Created by {event.createdBy}</p>
          </button>
  )
}


export default EventCard
