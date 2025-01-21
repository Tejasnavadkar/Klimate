import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useSearchLocationQuery } from "@/hooks/use-weatherapi"
import { useNavigate } from "react-router-dom"



const CitySearch = () => {

    const [open, setOpen] = useState(false)
    const [query,setQuery] = useState('')
   const navigate = useNavigate()

    const {isLoading,data:locations} = useSearchLocationQuery(query)

    console.log('search-location--',locations)

    const handleSelect =(city:string) =>{
          const [lat,lon,name,country] = city.split('|')

          // search history

        setOpen(false)
        navigate(`/city/${name}/?lat=${lat}&lon=${lon}`)
    }

    // useEffect(()=>{

    //     use

    // },[query])

    return (
        <>
        
          <Button onClick={()=>setOpen(true)} variant={'outline'} className="px-6 relative">Search City..</Button>
        
            <CommandDialog open={open} onOpenChange={setOpen} >
                <CommandInput 
                  placeholder="Type a command or search..." 
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                    
                   { query.length < 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty> }

                    <CommandGroup heading="Favourates">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>

                    <CommandSeparator/>

                    <CommandGroup heading="Reacent Search">
                        <CommandItem>Calesndar</CommandItem>
                    </CommandGroup>

                    <CommandSeparator/>

                    {locations && locations?.length > 0 && (
                         <CommandGroup heading="Suggetions">
                         {locations.map((location)=>{
                            return <CommandItem
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                     onSelect={handleSelect}>
                               {`${location.name},${location.state},${location.country}`}
                                {/* <span>
                                    <span>{location.name}</span><span>{location.state}</span><span>{location.state}</span>
                                </span> */}
                            </CommandItem>
                         })}
                     </CommandGroup>
                    )}
             
                    
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch