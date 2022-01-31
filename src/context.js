import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // state component management
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cockTail, setCockTail] =useState([])

  // fetch data
  const fetchcocktail = useCallback(async ()=>{
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const {drinks} = data

      if(drinks){
        const newdrink=drinks.map((drink)=>{
          const{
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,}=drink
          return {
          id:idDrink,
          name:strDrink,
          image:strDrinkThumb,
          info:strAlcoholic, 
          glass:strGlass
          }
        })
        setCockTail(newdrink)
        setLoading(false)
        
      } else{
        setCockTail([])
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  },[searchTerm])

  useEffect(()=>{
    fetchcocktail()
  },[searchTerm])
  return <AppContext.Provider 
  value={{
     loading,
     setSearchTerm, 
     cockTail
  }}>
    {children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
