

// in this hook we just do set and get localstoarge but by writing scalable code

import { useEffect, useState } from "react"

export const useLocalStorage  = <T>(key:string,initialValue:T) =>{ 
     
  const [storedValue,setStoredValue] = useState<T>(()=>{  // create state with initail value fn and inside whatever key provided i will fetch that

     try {
        
        const item = window.localStorage.getItem(key)  // here we simply fetch the key then if it exist return it otherwise return initialValue

        return item ? JSON.parse(item) : initialValue

     } catch (error) {

        console.error(error)
        return initialValue
        
     }
    })

    //then after initializing state i'll take the useEffect and if key or storedValue changes then set new storedValue in localStorage
    //and then simply return storedVal and setStoredValue

    useEffect(()=>{

      try {
         window.localStorage.setItem(key,JSON.stringify(storedValue))
         
      } catch (error) {
         console.warn(error)
         
      }

    },[key,storedValue])


    return [storedValue,setStoredValue] as const   //and then simply return storedVal and setStoredValue to use further

    // but before this we need to write logic for adding things in our search history 
    // so to manage our search history create seperate hook i.e :-  use-Search-History.ts 

}