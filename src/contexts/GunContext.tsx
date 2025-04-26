import {createContext, useContext, ReactNode} from 'react'
import {gun} from '@services/gunService'

const GunContext = createContext<string | null>(null)
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
