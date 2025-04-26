import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router.tsx'
import {GunProvider} from '@contexts/GunContext'
import {UserProvider} from '@contexts/UserContext'

createRoot(document.getElementById('root')!).render(
  <GunProvider>  
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </GunProvider>
)
