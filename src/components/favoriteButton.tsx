import { useFavorites } from "@/hooks/useFavorite"
import { Button } from "./ui/button"
import { ChartNoAxesColumn, Star } from "lucide-react"
import { WeatherData } from "@/api/types"
import { data } from "react-router-dom"
import { toast } from "sonner"

interface FavoriteButtonProps{
    Data:WeatherData
}


export const FavoriteButton = ({Data}:FavoriteButtonProps) => {
    const {favorites,addFavorites,removeFavorite,isFavorite} = useFavorites()
    console.log('coords-==',Data.coord.lat,Data.coord.lon)
    
    // let isCurrentFavorite:any = null 
    // if(Data.coord.lat && Data.coord.lon) isCurrentFavorite = isFavorite(Data.coord.lat,Data.coord.lon)
    const isCurrentFavorite = isFavorite(Data.coord.lat,Data.coord.lon)
   
    const handleToggleFavorite = () =>{
        console.log('isCurrentFavorite--',isCurrentFavorite)
        if(isCurrentFavorite){
            console.log('remove-toster----')
            removeFavorite.mutate(`${Data.coord.lat}-${Data.coord.lon}`)
            toast.error(`Removed ${Data.name} From Favorite`)
        }else{
            addFavorites.mutate({
                name: Data.name,
                lat: Data.coord.lat,
                lon: Data.coord.lon,
                country: Data.sys.country,
            })
    
            toast.success(`Add ${data.name} To Favorites`)
        }

      

    }

    return <>
    <Button 
       variant={isCurrentFavorite ? 'default': 'outline'} 
       size={'icon'}
       className={isCurrentFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
       onClick={handleToggleFavorite}
       >
        <Star className={`h-4 w-4 ${isCurrentFavorite ? 'fill-current' : ''}`}/>
    </Button>
    </>
}