

// in this hook we just do set and get localstoarge but by writing scalable code

import { useState } from "react"

export const useLocalStorage  = <T>(key:string,initialValue:T) =>{ 
     
  const [storedValue,setStoredValue] = useState<T>(()=>{  // create state with initail value fn and inside whatever key provided i will fetch that

     try {
        
        const item = window.localStorage.getItem('key')  // here we simply fetch the key then if it exist return it otherwise return initialValue

        return item ? JSON.parse(item) : initialValue

     } catch (error) {

        console.error(error)
        return initialValue
        
     }
    })

}