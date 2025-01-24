import { useFavorites } from "@/hooks/useFavorite"
import { ScrollArea,ScrollBar } from "./ui/scroll-area"
import { useWeatherQuery } from "@/hooks/use-weatherapi"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface FavoriteCitiesTabletsProps{
   id:string,
   name:string,
   lat:number,
   lon:number,
   onRemove:(id:string)=>void
}


export const FavoriteCities = () => {

   const {favorites,removeFavorite} = useFavorites()


   if(!favorites.length){
      return null
   }

    return <>

    <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full ">
       <div className="flex gap-2">
         {/* {favorites.map((item)=>{
            return <FavoriteCitiesTablets key={item.id} {...item} onRemove={()=>removeFavorite.mutate(item.id)} />
         )} */}
          {favorites.map((item)=>{ 
            return <FavoriteCitiesTablets key={item.id} {...item} onRemove={()=>removeFavorite.mutate(item.id)} />
         })}
       </div>
      </ScrollArea>
    </>
}

export const FavoriteCitiesTablets = ({id,name,lat,lon,onRemove}:FavoriteCitiesTabletsProps) =>{

  const {data,isLoading} = useWeatherQuery({lat,lon})
  console.log('dataata---',data)
   return (
      <>
         <div className=" relative bg-card min-w-[300px] flex  justify-between p-3 rounded-md pr-8  cursor-pointer" >

          <Button 
             variant={'ghost'} 
             size={'icon'}  
             className="absolute top-1 right-1 h-6 w-6  p-0"
             onClick={()=>{
               onRemove(id)
               toast.error(`Remove ${name} From Favorites`)
             }}  >
          <X className="h-4 w-4" />
          </Button>

            <div className="flex items-center gap-2">
               <div>
                  <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`} alt="" />
               </div>
               <div>
                  <div className="font-bold text-xl">{name}</div>
                  <div className="text-xs text-muted-foreground">{data?.sys.country}</div>
               </div>
            </div>
            <div>
               <div  className="font-bold text-xl">
                  { data?.main.temp && Math.round(data?.main.temp)}°
               </div>
               <div className="text-xs text-muted-foreground">
                  {data?.weather[0].description}
               </div>
            </div>
         </div>
      </>
   )
}