import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEvents} from '@hooks/useEvents'

const CreateEventPage = ( ) => {
  const { createEvent} = useEvents()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      await createEvent(title, description)
      navigate('/home')
    } catch (err) {
      console.error('failed to create event',err)
    }
  }


 
return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}
export default CreateEventPage
