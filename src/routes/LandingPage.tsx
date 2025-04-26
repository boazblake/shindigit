import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useUserContext} from '@contexts/UserContext'

const LandingPage = () => {
  const {login,logout, signup, user} = useUserContext()
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')



const handleSubmit = async (e:React.FormEvent) => {
  e.preventDefault()
  try {
   isLogin 
     ? await login(alias, password)
     : await signup(alias,password)
    navigate('/home')
   } catch (err) {
     console.error('Auth Error', err)
   }
}


return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl mb-8">Welcome to Eviter</h1>
      <div className="mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 mr-2 rounded ${
            isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded ${
            !isLogin ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          required
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`px-4 py-2 w-full rounded text-white ${
            isLogin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );}


export default LandingPage
