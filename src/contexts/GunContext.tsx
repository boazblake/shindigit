import {createContext, useContext, ReactNode} from 'react'
import Gun from 'gun'
import {gun} from '@services/gunService'

const GunContext = createContext<typeof gun | null>(null)
export const GunProvider = ({children}: {children:ReactNode}) => {
return (
    <GunContext.Provider value={gun}>
      {children}
    </GunContext.Provider>
  )
}


export const useGunContext = () => {
  return useContext(GunContext)
}
