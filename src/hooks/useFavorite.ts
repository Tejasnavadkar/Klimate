import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "./use-local-storage"

interface FavoriteCity{
    id: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    addedAt: number;
}

 export const useFavorites = () => {

    const [favoritess,setFavorites] = useLocalStorage<FavoriteCity[]>("Favorites",[])

    const queryClient = useQueryClient()
    const favoritesQuery = useQuery({
        queryKey:["favorites"],
        queryFn:()=> favoritess,
        initialData:favoritess,
        staleTime:Infinity // Since we're managing the data in localStorage data not gonna forbidden
    })

  // now create mutations to manage/manupulate data
  
  const addFavorites = useMutation({
    mutationFn:async (city:Omit<FavoriteCity,"id"| "addedAt">)=>{
        const newFavorite:FavoriteCity = {
            ...city,
            id:`${city.lat}-${city.lon}`,
            addedAt:Date.now()
        }

        //prevent Duplicates
       const isCityExist = favoritess.some((item)=> item.lat === city.lat && item.lon === city.lon)
        
       if(isCityExist) return favoritess // agar city already favorites me hai to add mat karo yahi se return
       
       const newFavoritCities = [...favoritess,newFavorite]

       setFavorites(newFavoritCities)
       return newFavoritCities
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:["favorites"]   // Invalidate and refetch
        })
    }
  })

  const removeFavorite = useMutation({
    mutationFn:async (cityId:string)=>{

      const filterdeCity =  favoritess.filter((item)=> item.id !== cityId)

      setFavorites(filterdeCity)
      return filterdeCity
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:["favorites"]
        })
    }
  })

  return {
    favorites:favoritesQuery.data,
    addFavorites,
    removeFavorite,
    isFavorite:(lat:number,lon:number)=>{
     
      return favoritess.some((item)=> item.lat === lat && item.lon === lon) // to check favorite or not
    }
  }


}