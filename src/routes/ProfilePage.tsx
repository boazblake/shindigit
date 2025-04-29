import {useNavigate} from 'react-router-dom'
import {useUserContext} from '@contexts/UserContext'

const ProfilePage = () => {
  const {user, logout} = useUserContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

console.log(user)
  return (
    <div className="p-4">
    <h1 className="text-2xl mb-4">Profile</h1>
    <div className="space-y-2">
    <p><strong>Alias:</strong> {user.alias}</p>
    <p><strong>Public Key:</strong> {user.pub}</p>
    </div>
    <button onClick={handleLogout} className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  )
}

export default ProfilePage
